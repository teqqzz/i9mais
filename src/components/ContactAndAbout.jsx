import React, { useState } from 'react';

export function ContactAndAbout() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    alert('Lógica de envio do formulário aqui.');
  };

  return (
    <section id="contato" className="contact-about-section">
      <div className="container">
        <div className="contact-about-grid">
          
          <div className="about-content">
            <h2 className="section-title-left">Quer nos conhecer melhor?</h2>
            <p className="about-text">Somos uma empresa comprometida em transformar o futuro da energia por meio da inovação e sustentabilidade.</p>
            
            <div className="values-list">
              <div className="value-item">
                <h3>Missão</h3>
                <p>Democratizar as energias renováveis e explorar seu potencial produtivo.</p>
              </div>
              <div className="value-item">
                <h3>Visão</h3>
                <p>Ser referência em inovação e sustentabilidade, promovendo práticas que geram valor econômico e social.</p>
              </div>
              <div className="value-item">
                <h3>Valores</h3>
                <p>Inovação, sustentabilidade, integridade e inspiração para criar um futuro melhor.</p>
              </div>
            </div>
          </div>

          <div className="contact-content">
            <h2 className="section-title-left">Entre em Contato</h2>
            <form className="contact-form" onSubmit={handleSubmit}>
              <input type="text" name="name" placeholder="Seu nome" value={formData.name} onChange={handleChange} required />
              <input type="email" name="email" placeholder="Seu e-mail" value={formData.email} onChange={handleChange} required />
              <input type="tel" name="phone" placeholder="Seu telefone" value={formData.phone} onChange={handleChange} />
              <textarea name="message" rows="5" placeholder="Sua mensagem" value={formData.message} onChange={handleChange}></textarea>
              <p className="form-terms">Ao fornecer seus dados, você autoriza o uso de informações para fins de comunicação, em conformidade com a LGPD.</p>
              <button type="submit" className="cta-button">Enviar mensagem</button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}