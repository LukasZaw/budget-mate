import { Analytics } from "@vercel/analytics/react";
import BudgetPlanner from "./components/BudgetPlanner";

function App() {
  return (
    <div>
      <h1>Budget Mate</h1>
      <div className="subtitle">
        Prosty, interaktywny planer budżetu. Dodawaj przychody i wydatki,
        filtruj według kategorii i kontroluj bilans w czasie rzeczywistym.
      </div>

      <BudgetPlanner />

      <p style={{ marginTop: "2.5rem", fontSize: ".75rem", opacity: .6 }}>
        Made by <a href="https://github.com/LukasZaw" target="_blank" rel="noreferrer">LukasZaw</a>
      </p>
      <Analytics />
    </div>
  );
}

export default App;
