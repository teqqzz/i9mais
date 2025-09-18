import React, { useState, useEffect, useRef } from 'react';
import { API_URL } from '@/config';

function animateValue(setter, key, end, duration) {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    const currentValue = Math.floor(progress * end);
    setter(prev => ({ ...prev, [key]: currentValue }));
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
};

export function ImpactDashboard() {
  const [counters, setCounters] = useState({ mwh: 0, co2: 0, minerals: 0, cost: 0 });
    const [finalValues, setFinalValues] = useState(null);
  const sectionRef = useRef(null);

    useEffect(() => {
        fetch(`${API_URL}/api/impact-data`)
            .then(res => res.json())
            .then(data => setFinalValues(data))
            .catch(err => console.error("Falha ao carregar dados de impacto:", err));
    }, []);

  useEffect(() => {
        if (!finalValues) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        animateValue(setCounters, 'mwh', finalValues.mwh, 2000);
        animateValue(setCounters, 'co2', finalValues.co2, 2000);
        animateValue(setCounters, 'minerals', finalValues.minerals, 2000);
        animateValue(setCounters, 'cost', finalValues.cost, 2000);
        observer.disconnect();
      }
    }, { threshold: 0.5 });

        const currentSectionRef = sectionRef.current;

    if (currentSectionRef) {
      observer.observe(currentSectionRef);
    }

    return () => {
          if (currentSectionRef) {
            observer.unobserve(currentSectionRef);
          }
        };
  }, [finalValues]);

  return (
    <section id="impacto" ref={sectionRef} className="py-20 bg-gray-900">
      <div className="container">
        <div className="section-title text-center mb-12">
          <h2>Nosso Impacto em Números</h2>
          <p>Dados quantitativos que provam nosso compromisso com a sustentabilidade.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="glass-card text-center">
            <h3 className="text-5xl font-extrabold gradient-text">{counters.mwh.toLocaleString('pt-BR')}</h3>
            <p className="mt-2 text-lg font-semibold">MWh Reinstalados</p>
            <p className="text-sm text-gray-400">Energia armazenada em baterias de "Second Life".</p>
          </div>
          <div className="glass-card text-center">
            <h3 className="text-5xl font-extrabold gradient-text">{counters.co2.toLocaleString('pt-BR')}</h3>
            <p className="mt-2 text-lg font-semibold">Ton. de CO₂ Evitadas</p>
            <p className="text-sm text-gray-400">Emissões prevenidas ao evitar a produção de baterias novas.</p>
          </div>
          <div className="glass-card text-center">
            <h3 className="text-5xl font-extrabold gradient-text">{counters.minerals.toLocaleString('pt-BR')}</h3>
            <p className="mt-2 text-lg font-semibold">Kg de Minerais Recuperados</p>
            <p className="text-sm text-gray-400">Lítio, Cobalto e Níquel recuperados via hidrometalurgia.</p>
          </div>
          <div className="glass-card text-center">
            <h3 className="text-5xl font-extrabold gradient-text">{counters.cost}%</h3>
            <p className="mt-2 text-lg font-semibold">Redução Média de Custo</p>
            <p className="text-sm text-gray-400">Economia para clientes que adotaram nossas soluções.</p>
          </div>
        </div>
      </div>
    </section>
  );
}