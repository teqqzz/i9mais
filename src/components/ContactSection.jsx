import React, { useState } from 'react';

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });


  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); 

    try {
      const response = await fetch('http://localhost:3000/cadastro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), 
      });

      const result = await response.json();

      if (response.ok) {
        alert('Mensagem enviada com sucesso!');
        console.log('Resposta do servidor:', result.message);
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        throw new Error(result.message || 'Ocorreu um erro ao enviar.');
      }

    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
      alert('Falha ao enviar mensagem. Tente novamente.');
    }
  };

  return (
    <section id="contato" className="contact-section">
      <div className="container">
        <h2 className="section-title">Faça Seu Cadastro</h2>
        <form className="contact-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Seu nome"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Seu e-mail"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Seu telefone"
            value={formData.phone}
            onChange={handleChange}
          />
          <textarea
            name="message"
            rows="5"
            placeholder="Sua mensagem"
            value={formData.message}
            onChange={handleChange}
          ></textarea>
          <p className="form-terms">Ao fornecer seus dados, você autoriza o uso de informações para fins de comunicação, em conformidade com a LGPD.</p>
          <button type="submit" className="cta-button">Enviar mensagem</button>
        </form>
      </div>
    </section>
  );
}