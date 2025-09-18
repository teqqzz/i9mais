import React, { useState, useEffect } from 'react';
import { API_URL } from '@/config';

export function SettingsPage() {
    const [email, setEmail] = useState('');
    const [emailStatus, setEmailStatus] = useState('');
    
    const [impactData, setImpactData] = useState({ mwh: 0, co2: 0, minerals: 0, cost: 0 });
    const [impactStatus, setImpactStatus] = useState('');
    
    const [calcPrices, setCalcPrices] = useState({ nova: 0, i9plus: 0, peso_kg: 0 });
    const [calcStatus, setCalcStatus] = useState('');

    useEffect(() => {
        fetch(`${API_URL}/api/admin/settings/contact-email`, { credentials: 'include' })
            .then(res => res.json())
            .then(data => setEmail(data.email));

        fetch(`${API_URL}/api/impact-data`)
            .then(res => res.json())
            .then(data => setImpactData(data));
        
        fetch(`${API_URL}/api/calculator-prices`)
            .then(res => res.json())
            .then(data => setCalcPrices(data));
    }, []);

    const handleEmailSave = async (e) => {
        e.preventDefault();
        setEmailStatus('Salvando...');
        const res = await fetch(`${API_URL}/api/admin/settings/contact-email`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email }),
            credentials: 'include'
        });
        setEmailStatus(res.ok ? 'Salvo com sucesso!' : 'Erro ao salvar.');
        setTimeout(() => setEmailStatus(''), 3000);
    };

    const handleTestEmail = async () => {
        setEmailStatus('Enviando teste...');
        const res = await fetch(`${API_URL}/api/admin/settings/test-email`, {
            method: 'POST',
            credentials: 'include'
        });
        const data = await res.json();
        setEmailStatus(res.ok ? data.message : `Erro: ${data.error}`);
        setTimeout(() => setEmailStatus(''), 5000);
    };

    const handleImpactChange = (e) => {
        const { name, value } = e.target;
        setImpactData(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
    };

    const handleImpactSave = async (e) => {
        e.preventDefault();
        setImpactStatus('Salvando...');
        const res = await fetch(`${API_URL}/api/admin/impact-data`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(impactData),
            credentials: 'include'
        });
        setImpactStatus(res.ok ? 'Salvo com sucesso!' : 'Erro ao salvar.');
        setTimeout(() => setImpactStatus(''), 3000);
    };

    const handleCalcPriceChange = (e) => {
        const { name, value } = e.target;
        setCalcPrices(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
    };

    const handleCalcPricesSave = async (e) => {
        e.preventDefault();
        setCalcStatus('Salvando...');
        const res = await fetch(`${API_URL}/api/admin/calculator-prices`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(calcPrices),
            credentials: 'include'
        });
        setCalcStatus(res.ok ? 'Salvo com sucesso!' : 'Erro ao salvar.');
        setTimeout(() => setCalcStatus(''), 3000);
    };

    return (
        <>
            <header className="admin-header">
                <h1>Configurações Gerais</h1>
            </header>
            <main className="admin-page-content">
                <div className="admin-card">
                    <div className="admin-card-header">
                        <h2>E-mail de Notificação de Contato</h2>
                    </div>
                    <div className="admin-card-body">
                        <form onSubmit={handleEmailSave} className="admin-form">
                            <p>Endereço que receberá as mensagens do formulário de contato.</p>
                            <div className="form-group">
                                <label htmlFor="contact-email">E-mail para Contato</label>
                                <input type="email" id="contact-email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                            </div>
                            <div className="form-actions">
                                <button type="submit" className="admin-btn primary">Salvar E-mail</button>
                                <button type="button" onClick={handleTestEmail} className="admin-btn secondary">Enviar E-mail de Teste</button>
                            </div>
                            {emailStatus && <p style={{ marginTop: '15px' }}>{emailStatus}</p>}
                        </form>
                    </div>
                </div>

                <div className="admin-card" style={{ marginTop: '30px' }}>
                    <div className="admin-card-header">
                        <h2>Números do Dashboard de Impacto</h2>
                    </div>
                    <div className="admin-card-body">
                        <form onSubmit={handleImpactSave} className="admin-form">
                            <p>Altere os valores que aparecem na seção "Nosso Impacto em Números" da página inicial.</p>
                            <div className="form-grid">
                                <div className="form-group">
                                    <label htmlFor="mwh">MWh Reinstalados</label>
                                    <input type="number" name="mwh" value={impactData.mwh} onChange={handleImpactChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="co2">Ton. de CO₂ Evitadas</label>
                                    <input type="number" name="co2" value={impactData.co2} onChange={handleImpactChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="minerals">Kg de Minerais Recuperados</label>
                                    <input type="number" name="minerals" value={impactData.minerals} onChange={handleImpactChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="cost">Redução Média de Custo (%)</label>
                                    <input type="number" name="cost" value={impactData.cost} onChange={handleImpactChange} />
                                </div>
                            </div>
                            <div className="form-actions">
                                <button type="submit" className="admin-btn primary">Salvar Números do Impacto</button>
                            </div>
                            {impactStatus && <p style={{ marginTop: '15px' }}>{impactStatus}</p>}
                        </form>
                    </div>
                </div>
                
                <div className="admin-card" style={{ marginTop: '30px' }}>
                    <div className="admin-card-header">
                        <h2>Preços da Calculadora de Economia</h2>
                    </div>
                    <div className="admin-card-body">
                        <form onSubmit={handleCalcPricesSave} className="admin-form">
                            <p>Altere os valores base usados na "Calculadora de Economia Simples".</p>
                            <div className="form-grid">
                                <div className="form-group">
                                    <label htmlFor="nova">Custo Bateria Nova (R$)</label>
                                    <input type="number" name="nova" value={calcPrices.nova} onChange={handleCalcPriceChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="i9plus">Custo Requalificação i9+ (R$)</label>
                                    <input type="number" name="i9plus" value={calcPrices.i9plus} onChange={handleCalcPriceChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="peso_kg">Peso Médio Bateria (kg)</label>
                                    <input type="number" name="peso_kg" value={calcPrices.peso_kg} onChange={handleCalcPriceChange} />
                                </div>
                            </div>
                            <div className="form-actions">
                                <button type="submit" className="admin-btn primary">Salvar Preços da Calculadora</button>
                            </div>
                            {calcStatus && <p style={{ marginTop: '15px' }}>{calcStatus}</p>}
                        </form>
                    </div>
                </div>
            </main>
        </>
    );
}