export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}

export const aiChatService = {
  getApiKey: (): string => {
    return localStorage.getItem('GREENFLEET_OPENAI_KEY') || (import.meta as any).env?.VITE_OPENAI_API_KEY || '';
  },

  setApiKey: (key: string) => {
    localStorage.setItem('GREENFLEET_OPENAI_KEY', key);
  },

  sendMessage: async (userPrompt: string, history: ChatMessage[]): Promise<string> => {
    const apiKey = aiChatService.getApiKey();

    if (apiKey && apiKey.startsWith('sk-')) {
      try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages: [
              {
                role: 'system',
                content: `You are GreenFleet AI Assistant, an expert in fleet management, fuel saving, QUBO quantum route optimization, and IPCC emission standards. Answer concisely, warmly, and in simple easy-to-understand terms suitable for fleet drivers and logistics managers.`
              },
              ...history.slice(-6).map(m => ({
                role: m.sender === 'user' ? 'user' : 'assistant',
                content: m.text
              })),
              { role: 'user', content: userPrompt }
            ],
            max_tokens: 350,
            temperature: 0.7
          })
        });

        if (response.ok) {
          const data = await response.json();
          return data.choices[0]?.message?.content || "I couldn't generate an answer right now.";
        }
      } catch (err) {
        console.warn('OpenAI API call failed, falling back to GreenFleet AI Engine:', err);
      }
    }

    // High Quality Intelligent Rule-Based GreenFleet AI Fallback Response Engine
    const lower = userPrompt.toLowerCase();

    if (lower.includes('weather') || lower.includes('rain') || lower.includes('wind')) {
      return `🌦️ **Weather Impact Analysis**:
Headwinds, heavy rain, or rough sea swells increase aerodynamic drag and tire/water resistance.
• **Heavy Rain/Wet Roads**: +5% to +10% fuel penalty due to hydroplaning resistance.
• **Headwind (30+ km/h)**: Adds up to +12% fuel load.
• **Tip**: Reducing your speed by just 8-10 km/h during rainy weather cancels out the fuel penalty completely!`;
    }

    if (lower.includes('price') || lower.includes('cost') || lower.includes('fuel') || lower.includes('diesel') || lower.includes('lng')) {
      return `⛽ **Fuel Cost & Comparison Guide**:
• **Diesel (₹87 - ₹95/L)**: Reliable, high energy density, but higher tailpipe CO₂ (2.68 kg CO₂/L).
• **LNG (₹73 - ₹78/kg)**: Saves 15-20% on fuel bills compared to diesel and cuts particulate emissions by 80%!
• **Electric (₹8.5/kWh)**: Lowest operational cost (₹2-₹3 per km) for short urban routes.
• **Tip**: Check the "My Vehicles" tab to compare fuel costs for your specific fleet payload!`;
    }

    if (lower.includes('route') || lower.includes('qubo') || lower.includes('best') || lower.includes('traffic')) {
      return `🧭 **How GreenFleet Selects Your Best Route**:
GreenFleet uses **Quantum-Inspired QUBO Optimization (Simulated Annealing & Tabu Search)** to balance 3 factors simultaneously:
1. 💰 **Fuel Cost**: Prefers smooth highways without steep hills.
2. ⏱ **Travel Time**: Avoids heavy traffic bottlenecks & toll stops.
3. 🌱 **Emissions**: Minimizes total CO₂ produced per ton of cargo.

Click **Find Best Route** in the sidebar to see interactive map comparisons!`;
    }

    if (lower.includes('save') || lower.includes('money') || lower.includes('speed')) {
      return `💡 **Top 3 Quick Ways to Save Fuel Today**:
1. **Maintain Steady Speed (60-70 km/h)**: Speeds above 80 km/h consume up to 25% more fuel.
2. **Proper Tire Pressure**: Underinflated tires waste 3-5% fuel on every trip.
3. **Avoid Idle Engine Run**: Idling for 10 minutes wastes ~0.5 liters of fuel.`;
    }

    return `🤖 **Hello! I am GreenFleet AI Assistant.**
I can help you with:
• ⛽ **Fuel & Cost Estimates** (Diesel vs LNG vs Electric)
• 🌦️ **Weather & Road Resistance**
• 🧭 **Route Optimization & Traffic Avoidance**
• 💰 **Maximizing Monthly Fleet Savings**

Feel free to ask me anything about your trip or vehicle!`;
  }
};
