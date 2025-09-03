import React from 'react';
import { Card } from './Card';

export function ProblemsSection() {
  const problems = [
    {
      image: 'https://images.pexels.com/photos/414837/pexels-photo-414837.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      title: 'Altos Custos',
      text: 'Muitos ainda percebem as soluções sustentáveis como um investimento inicial elevado, sem compreender os benefícios financeiros no longo prazo.',
    },
    {
      image: 'https://images.pexels.com/photos/45953/pexels-photo-45953.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      title: 'Impacto Ambiental',
      text: 'A transição para práticas sustentáveis diminui a dependência de combustíveis fósseis, reduz emissões de carbono e protege os recursos naturais.',
    },
    {
      image: 'https://images.pexels.com/photos/380769/pexels-photo-380769.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      title: 'Falta de Informação',
      text: 'A falta de conhecimento sobre os benefícios da energia renovável e da economia circular impede que muitas pessoas adotem práticas sustentáveis.',
    },
  ];

  return (
    <section id="problemas" className="problem-section">
      <div className="container">
        <h2 className="section-title">Por que é hora de adotar práticas sustentáveis?</h2>
        <div className="cards-grid">
          {problems.map(problem => (
            <Card key={problem.title} {...problem} />
          ))}
        </div>
      </div>
    </section>
  );
}