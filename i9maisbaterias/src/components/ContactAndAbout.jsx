import React, { useState } from 'react';
import { API_URL } from '@/config';

export function ContactAndAbout() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState({ sending: false, error: null, success: false });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ sending: true, error: null, success: false });
    try {
      const response = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Falha ao enviar mensagem.');
      }
      setStatus({ sending: false, error: null, success: true });
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (err) {
      setStatus({ sending: false, error: err.message, success: false });
    }
  };

  return (
    <section id="contato" className="contact-about-section">
      <div className="container">
        <div className="contact-about-grid">
          
                    {/* A SEÇÃO "ABOUT-CONTENT" FOI REMOVIDA DAQUI */}

          <div className="contact-content" style={{ gridColumn: '1 / -1' }}>
            <h2 className="section-title">Entre em Contato</h2>
                        
                        <p className="contact-intro-text" style={{ textAlign: 'center' }}>
                            Caso queira marcar uma visita ou tirar dúvidas,
                            preencha o formulário abaixo que lhe responderemos no e-mail.
                        </p>

            {status.success ? (
              <div className="form-success-message">
                <h3>Obrigado pelo contato!</h3>
                <p>Recebemos sua mensagem e entraremos em contato em breve.</p>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit} style={{ maxWidth: '700px', margin: '0 auto' }}>
                <input type="text" name="name" placeholder="Seu nome" value={formData.name} onChange={handleChange} required disabled={status.sending} />
                <input type="email" name="email" placeholder="Seu e-mail" value={formData.email} onChange={handleChange} required disabled={status.sending} />
                <input type="tel" name="phone" placeholder="Seu telefone" value={formData.phone} onChange={handleChange} disabled={status.sending} />
                <textarea name="message" rows="5" placeholder="Sua mensagem" value={formData.message} onChange={handleChange} required disabled={status.sending}></textarea>
                <p className="form-terms">Ao fornecer seus dados, você autoriza o uso para fins de comunicação, em conformidade com a LGPD.</p>
                {status.error && <p style={{ color: 'red', marginBottom: '10px' }}>Erro: {status.error}</p>}
                <button type="submit" className="cta-button" disabled={status.sending}>
                  {status.sending ? 'Enviando...' : 'Enviar Mensagem'}

                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}