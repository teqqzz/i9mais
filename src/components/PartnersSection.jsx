import React from 'react';

export function PartnersSection() {
  const partners = [
    { name: 'EMBRAPII', logo: 'https://inovemais.tec.br/images/embrapii-logo.png' },
    { name: 'SENAI', logo: 'https://inovemais.tec.br/images/senai-logo.png' },
    { name: 'UTFPR', logo: 'https://inovemais.tec.br/images/utfpr-logo.png' },
    { name: 'CNPq', logo: 'https://inovemais.tec.br/images/cnpq-logo.png' },
    { name: 'CEMIG', logo: 'https://inovemais.tec.br/images/cemig-logo.png' },
    { name: 'SESI', logo: 'https://inovemais.tec.br/images/sesi-logo.png' },
  ];

  return (
    <section id="parceiros" className="partners-section">
      <div className="container">
        <h2 className="section-title">Parceiros que Confiam em Nossa Tecnologia</h2>
        <div className="partners-grid">
          {partners.map(partner => (
            <div key={partner.name} className="partner-logo-container">
              <img src={partner.logo} alt={`Logo ${partner.name}`} className="partner-logo" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}