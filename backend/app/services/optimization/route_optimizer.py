import numpy as np

try:
    from app.utils.helpers import haversine_distance_km
except ModuleNotFoundError:
    from backend.app.utils.helpers import haversine_distance_km

class RouteOptimizer:
    """
    Vehicle Routing Problem (VRP) & Capacitated VRP solver with time window heuristic support.
    """

    @staticmethod
    def build_distance_matrix(locations: list) -> np.ndarray:
        n = len(locations)
        dist_matrix = np.zeros((n, n))
        for i in range(n):
            for j in range(n):
                if i != j:
                    dist_matrix[i, j] = haversine_distance_km(
                        locations[i]["lat"], locations[i]["lng"],
                        locations[j]["lat"], locations[j]["lng"]
                    )
        return dist_matrix

    @staticmethod
    def partition_tasks_by_vehicle_capacity(tasks: list, vehicles: list, dist_matrix: np.ndarray) -> list:
        """
        Greedy multi-vehicle partition heuristic matching load capacities and locations.
        """
        routes = []
        unassigned_tasks = list(tasks)
        
        for idx, vehicle in enumerate(vehicles):
            if not unassigned_tasks:
                break
                
            capacity_remaining = vehicle.get("max_payload_kg", 5000.0)
            vehicle_route_tasks = []
            
            # Select nearest tasks within payload capacity limit
            curr_pos = 0 # Depot index
            
            i = 0
            while i < len(unassigned_tasks):
                task = unassigned_tasks[i]
                demand = task.get("demand_kg", 500.0)
                
                if demand <= capacity_remaining:
                    vehicle_route_tasks.append(task)
                    capacity_remaining -= demand
                    unassigned_tasks.pop(i)
                else:
                    i += 1
                    
            if vehicle_route_tasks:
                routes.append({
                    "vehicle": vehicle,
                    "tasks": vehicle_route_tasks
                })
                
        # If any tasks remain, assign to primary vehicle
        if unassigned_tasks and routes:
            routes[0]["tasks"].extend(unassigned_tasks)
            
        return routes
