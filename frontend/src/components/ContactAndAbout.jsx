import React, { useState } from 'react';

const API_URL = 'http://localhost:3000'; 


// Componente de Seção de Contato e Sobre Nós
export function ContactAndAbout() {

    // Estado para o formulário de contato
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
    
    // Estado para status do envio
    const [status, setStatus] = useState({
        sending: false,
        error: null,
        success: false,
    });

    // Função para atualizar os dados do formulário
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    // Função para enviar o formulário
    const handleSubmit = async (event) => {
        event.preventDefault();
        
        setStatus({ sending: true, error: null, success: false });

        try {
            const response = await fetch(`${API_URL}/api/contact`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
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
                        

                        {status.success ? (
                            <div className="form-success-message" style={{padding: '20px', border: '1px solid var(--admin-success)', borderRadius: '6px', backgroundColor: '#f0fff4'}}>
                                <h3>Obrigado pelo contato!</h3>
                                <p>Recebemos sua mensagem e entraremos em contato em breve.</p>
                            </div>
                        ) : (
                            <form className="contact-form" onSubmit={handleSubmit}>
                                <input type="text" name="name" placeholder="Seu nome" value={formData.name} onChange={handleChange} required disabled={status.sending} />
                                <input type="email" name="email" placeholder="Seu e-mail" value={formData.email} onChange={handleChange} required disabled={status.sending} />
                                <input type="tel" name="phone" placeholder="Seu telefone" value={formData.phone} onChange={handleChange} disabled={status.sending} />
                                <textarea name="message" rows="5" placeholder="Sua mensagem" value={formData.message} onChange={handleChange} required disabled={status.sending}></textarea>
                                <p className="form-terms">Ao fornecer seus dados, você autoriza o uso de informações para fins de comunicação, em conformidade com a LGPD.</p>
                                

                                {status.error && <p style={{ color: 'red', marginBottom: '10px' }}>Erro: {status.error}</p>}

                                <button type="submit" className="cta-button" disabled={status.sending}>
                                    {status.sending ? 'Enviando...' : 'Enviar mensagem'}
                                </button>
                            </form>
                        )}
                    </div>

                </div>
            </div>
        </section>
    );
}