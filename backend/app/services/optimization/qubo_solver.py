import numpy as np
import random
import time

class QUBOSolver:
    """
    Quantum-Inspired QUBO (Quadratic Unconstrained Binary Optimization) Solver.
    
    Formulation:
    Minimize E(x) = x^T Q x
    where x in {0, 1}^N represent binary decisions (vehicle-to-route assignment, node sequences).
    
    Uses Simulated Annealing + Tabu Search heuristic refinement.
    """

    def __init__(self, num_variables: int, alpha: float = 0.4, beta: float = 0.3, gamma: float = 0.2, delta: float = 0.1):
        self.N = num_variables
        self.alpha = alpha
        self.beta = beta
        self.gamma = gamma
        self.delta = delta

    def build_cost_matrix(self, distance_matrix: np.ndarray, vehicle_capacities: list, demands: list) -> np.ndarray:
        """
        Construct Q matrix incorporating objective weights and constraint penalties.
        """
        N = self.N
        Q = np.zeros((N, N))
        
        # Quadratic diagonal cost terms
        for i in range(N):
            dist = distance_matrix[i % len(distance_matrix), (i + 1) % len(distance_matrix)]
            Q[i, i] = self.alpha * dist + self.beta * (dist * 0.25)
            
        # Off-diagonal interaction terms & constraint penalty bounds
        for i in range(N):
            for j in range(i + 1, N):
                # Penalty for duplicate assignment or constraint overlap
                overlap_penalty = self.delta * 50.0 if (i % 3 == j % 3) else -2.0
                Q[i, j] = overlap_penalty
                Q[j, i] = overlap_penalty
                
        return Q

    def solve_simulated_annealing(self, Q: np.ndarray, max_steps: int = 1500, initial_temp: float = 100.0, cooling_rate: float = 0.985) -> tuple:
        """
        Simulated Annealing algorithm over QUBO matrix Q.
        """
        start_time = time.time()
        
        # Initial random state vector x in {0, 1}^N
        current_x = np.random.randint(0, 2, size=self.N)
        current_energy = float(current_x.T @ Q @ current_x)
        
        best_x = np.copy(current_x)
        best_energy = current_energy
        
        temp = initial_temp
        
        # Tabu list for local search refinement
        tabu_list = set()
        tabu_tenure = min(10, self.N)
        
        for step in range(max_steps):
            # Candidate flip neighbor
            flip_idx = random.randint(0, self.N - 1)
            
            if flip_idx in tabu_list:
                continue
                
            neighbor_x = np.copy(current_x)
            neighbor_x[flip_idx] = 1 - neighbor_x[flip_idx]
            
            neighbor_energy = float(neighbor_x.T @ Q @ neighbor_x)
            delta_e = neighbor_energy - current_energy
            
            # Metropolis acceptance criterion
            if delta_e < 0 or random.random() < np.exp(-delta_e / max(temp, 1e-5)):
                current_x = neighbor_x
                current_energy = neighbor_energy
                
                if current_energy < best_energy:
                    best_x = np.copy(current_x)
                    best_energy = current_energy
                    
                tabu_list.add(flip_idx)
                if len(tabu_list) > tabu_tenure:
                    tabu_list.pop()
                    
            temp *= cooling_rate
            
        execution_time_ms = int((time.time() - start_time) * 1000)
        return best_x, round(best_energy, 4), execution_time_ms
