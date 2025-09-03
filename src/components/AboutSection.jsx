import React from 'react';
import { Card } from './Card';

export function AboutSection() {
  const values = [
    {
      image: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      title: 'Missão',
      text: 'Democratizar as energias renováveis e explorar seu potencial produtivo.',
    },
    {
      image: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      title: 'Visão',
      text: 'Ser referência em inovação e sustentabilidade, promovendo práticas que geram valor econômico e social.',
    },
    {
      image: 'https://images.pexels.com/photos/3184433/pexels-photo-3184433.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      title: 'Valores',
      text: 'Inovação, sustentabilidade, integridade e inspiração para criar um futuro melhor.',
    },
  ];

  return (
    <section id="sobre-nos" className="about-us-section">
      <div className="container">
        <h2 className="section-title">Quer nos conhecer melhor?</h2>
        <p className="about-us-intro">Somos uma empresa comprometida em transformar o futuro da energia por meio da inovação e sustentabilidade.</p>
        <div className="cards-grid">
          {values.map(value => (
            <Card key={value.title} {...value} />
          ))}
        </div>
      </div>
    </section>
  );
}