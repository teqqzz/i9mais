import React from 'react';

export function Hero() {
  const heroStyle = {
    backgroundImage: "url('https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExcTdlODg5d3lzbDMycmlmZGl4OHNjYmk1Y3NhZGxrMnBpbmF5ZWg5dSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/7vAQFq0mAEjk55KfeB/giphy.gif')"
  };

  return (
    <section className="hero-section" style={heroStyle}>
      <div className="hero-content">
        <h1>Energia Inteligente, Futuro Consciente.</h1>
        <p>Soluções duradouras, alinhadas com práticas de economia circular para inovar mais a indústria da energia sustentável.</p>
        <a href="#contato" className="cta-button">Faça seu cadastro</a>
      </div>
    </section>
  );
}