import React, { useState } from "react";

function formatCurrency(value) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

const precos = {
  nova: 8000,
  i9plus: 3200,
  peso_kg: 50,
};

export function SavingsCalculator() {
  const [formData, setFormData] = useState({
    quantity: 10,
    frequencyInYears: 2,
  });
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: parseInt(value, 10) || 0 }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const savingsPerBattery = precos.nova - precos.i9plus;
    const totalSavings = formData.quantity * savingsPerBattery;
    const totalWasteAvoided = formData.quantity * precos.peso_kg;
    const savingsPerCycle = totalSavings;

    setResult({
      savings: savingsPerCycle,
      waste: totalWasteAvoided,
      cycle: formData.frequencyInYears,
    });
  };

  return (
    <div className="calculator-instance">
      <h3>Calculadora de Economia Simples</h3>
      <div
        className="calculator-wrapper"
        style={{ gridTemplateColumns: "1fr", gap: "20px" }}
      >
        {" "}
        <div className="calculator-content">
          <p>
            Descubra a economia direta e o impacto ambiental positivo ao
            requalificar sua frota atual.
          </p>
        </div>
        <div className="calculator-form-area">
          <form onSubmit={handleSubmit} className="calculator-form">
            <div className="form-group">
              <label htmlFor="sav_quantity">
                Nº de Baterias (empilhadeiras, etc)
              </label>
              <input
                type="number"
                id="sav_quantity"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                min="1"
              />
            </div>
            <div className="form-group">
              <label htmlFor="sav_frequency">Frequência de Troca (Anos)</label>
              <input
                type="number"
                id="sav_frequency"
                name="frequencyInYears"
                value={formData.frequencyInYears}
                onChange={handleChange}
                min="1"
              />
            </div>
            <button type="submit" className="cta-button">
              Calcular Economia
            </button>
          </form>
        </div>
      </div>

      {result && (
        <div className="calculator-results active">
          <h3>Resultados (Economia):</h3>
          <div className="results-grid">
            <div className="result-item">
              <span className="result-value">
                {formatCurrency(result.savings)}
              </span>
              <span className="result-label">
                Economia direta a cada {result.cycle} anos.
              </span>
            </div>
            <div className="result-item">
              <span className="result-value">
                {result.waste.toLocaleString("pt-BR")} kg
              </span>
              <span className="result-label">
                Resíduos perigosos evitados (chumbo/lítio).
              </span>
            </div>
          </div>
          <p className="result-cta">
            <a href="#contato">Transforme custo em lucro</a>.
          </p>
        </div>
      )}
    </div>
  );
}
