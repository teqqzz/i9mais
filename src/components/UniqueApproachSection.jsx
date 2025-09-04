import React from 'react';

export function UniqueApproachSection() {
  return (
    <section className="unique-approach-section">
      <div className="container">
        <h2 className="section-title">Nossa Abordagem Única</h2>
        <div className="approach-grid">
          <div className="approach-item">
            <span className="icon">♻️</span>
            <h3>Economia Circular na Prática</h3>
            <p>Não apenas vendemos baterias, mas damos uma segunda vida aos acumuladores de energia. Nosso processo de requalificação 'Second Life' reduz o desperdício, os custos e o impacto ambiental, promovendo um ciclo energético verdadeiramente sustentável.</p>
          </div>
          <div className="approach-item">
            <span className="icon">🔬</span> 
            <h3>Inovação & P&D de Ponta</h3>
            <p>Somos uma Deep Tech. Em parceria com as maiores instituições de pesquisa do Brasil (EMBRAPII, SENAI, UTFPR, CNPq), desenvolvemos hardware e software proprietários, como o Traçador de Curva I-V, para diagnóstico e controle de qualidade.</p>
          </div>
          <div className="approach-item">
            <span className="icon">📊</span> 
            <h3>Inteligência de Dados e I.A.</h3>
            <p>Utilizamos Big Data e Inteligência Artificial para construir o maior banco de dados do setor de baterias. Isso nos permite otimizar a performance, garantir a padronização e predizer a vida útil de baterias para veículos elétricos e outras aplicações.</p>
          </div>
        </div>
      </div>
    </section>
  );
}