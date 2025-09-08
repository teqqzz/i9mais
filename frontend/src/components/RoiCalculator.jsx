import React, { useState } from "react";

// Função helper para formatar como moeda BRL
function formatCurrency(value) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

const precos = {
  nova: 8000, // Exemplo: Custo médio de uma bateria tracionária NOVA
  i9plus: 3200, // Exemplo: Custo médio do RECONDICIONAMENTO "Second Life" da i9+
  peso_kg: 50, // Exemplo: Peso médio (em KG) de uma bateria descartada
  vida_util_padrao: 8, // Anos de vida padrão
  kg_co2_por_bateria: 750, // Média de 750kg de CO2 por bateria de 10 kWh
};

export function RoiCalculator() {
  const [formData, setFormData] = useState({
    quantity: 10,
    frequencyInYears: 2,
    custoNova: 45000,
    vidaUtilExt: 4,
  });
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: parseInt(value, 10) || 0 }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Lógica de Cálculo
    const savingsPerBattery = precos.nova - precos.i9plus;
    const totalSavings = formData.quantity * savingsPerBattery;
    const totalWasteAvoided = formData.quantity * precos.peso_kg;
    const co2Evitado = formData.quantity * precos.kg_co2_por_bateria;

    // Cálculo de economia anualizada
    const economiaAnual =
      formData.vidaUtilExt > 0
        ? (totalSavings / (precos.vida_util_padrao + formData.vidaUtilExt)) *
          formData.vidaUtilExt
        : totalSavings / precos.vida_util_padrao;

    setResult({
      savings: economiaAnual,
      waste: totalWasteAvoided,
      co2: co2Evitado,
      cycle: formData.frequencyInYears,
    });
  };

  return (
    <div className="calculator-instance">
      <h3>Calculadora de ROI Avançada</h3>
      <div
        className="calculator-wrapper"
        style={{ gridTemplateColumns: "1fr", gap: "20px" }}
      >
        <div className="calculator-content">
          <p>
            Simule o ROI baseado no custo de baterias novas e a extensão da vida
            útil com a solução i9+.
          </p>
        </div>

        <div className="calculator-form-area">
          <form onSubmit={handleSubmit} className="calculator-form">
            <div className="form-group">
              <label htmlFor="roi_quantity">Nº de Baterias na Operação</label>
              <input
                type="number"
                id="roi_quantity"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                min="1"
              />
            </div>
            <div className="form-group">
              <label htmlFor="roi_frequency">Frequência de Troca (Anos)</label>
              <input
                type="number"
                id="roi_frequency"
                name="frequencyInYears"
                value={formData.frequencyInYears}
                onChange={handleChange}
                min="1"
              />
            </div>
            <div className="form-group">
              <label htmlFor="custoNova">Custo Médio Bateria Nova (R$)</label>
              <input
                type="number"
                id="custoNova"
                name="custoNova"
                value={formData.custoNova}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="vidaUtilExt">Extensão de Vida Útil (Anos)</label>
              <input
                type="number"
                id="vidaUtilExt"
                name="vidaUtilExt"
                value={formData.vidaUtilExt}
                onChange={handleChange}
              />
            </div>
            <button
              type="submit"
              className="cta-button"
              style={{ width: "100%" }}
            >
              Calcular ROI
            </button>
          </form>
        </div>
      </div>

      <div className={`calculator-results ${result ? "active" : ""}`}>
        {result && (
          <>
            <h3>Resultados (ROI):</h3>
            <div className="results-grid">
              <div className="result-item">
                <span className="result-value">
                  {formatCurrency(result.savings)}
                </span>
                <span className="result-label">Economia anual estimada.</span>
              </div>
              <div className="result-item">
                <span className="result-value">
                  {result.waste.toLocaleString("pt-BR")} kg
                </span>
                <span className="result-label">Resíduos evitados.</span>
              </div>
              <div className="result-item">
                <span className="result-value">
                  {result.co2.toLocaleString("pt-BR")} kg
                </span>
                <span className="result-label">CO₂ não emitido.</span>
              </div>
            </div>
            <p className="result-cta">
              <a href="#contato">Fale com um especialista</a>.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
