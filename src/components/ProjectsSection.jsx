import React from 'react';
import { Card } from './Card';

export function ProjectsSection() {
    const projects = [
        {
          image: 'https://images.builderservices.io/s/cdn/v1.0/i/m?url=https%3A%2F%2Fstorage.googleapis.com%2Fproduction-hostgator-brasil-v1-0-5%2F725%2F1528725%2F01Y0yIm7%2F96a46b04cbf94c1b92c7b29163d398dc&methods=resize%2C600%2C5000',
          title: 'Ageuni',
          text: 'Instalação de duas mini usinas solares de 3,5 kW em locais remotos, promovendo acesso à energia sustentável.',
          imageStyle: { backgroundSize: 'contain', backgroundColor: '#fff' },
        },
        {
          image: 'https://images.builderservices.io/s/cdn/v1.0/i/m?url=https%3A%2F%2Fstorage.googleapis.com%2Fproduction-hostgator-brasil-v1-0-5%2F725%2F1528725%2F01Y0yIm7%2F8bc519d9bcb440739a30561ad1f42e54&methods=crop%2C0%25%2C24.359%25%2C100%25%2C51.2821%25%7Cresize%2C600%2C5000',
          title: 'Embrapii',
          text: 'Desenvolvimento do Traçador de Curva, um produto eletrônico inovador para medir a relação entre Corrente e Tensão Elétrica.',
          imageStyle: { backgroundSize: 'contain', backgroundColor: '#fff' },
        },
        {
          image: 'https://images.builderservices.io/s/cdn/v1.0/i/m?url=https%3A%2F%2Fstorage.googleapis.com%2Fproduction-hostgator-brasil-v1-0-5%2F725%2F1528725%2F01Y0yIm7%2F16afb4eef67549e391b5fea2852190ec&methods=resize%2C600%2C5000',
          title: 'CNPq & Utfpr',
          text: 'Iniciativa para centralizar informações dos fabricantes de baterias de lítio do mercado de veículos elétricos.',
          imageStyle: { backgroundSize: 'contain', backgroundColor: '#fff' },
        },
        {
          image: 'https://images.builderservices.io/s/cdn/v1.0/i/m?url=https%3A%2F%2Fstorage.googleapis.com%2Fproduction-hostgator-brasil-v1-0-5%2F725%2F1528725%2F01Y0yIm7%2F7a0d391d375542a3ba1399f08c508823&methods=crop%2C0%25%2C23.4043%25%2C100%25%2C53.1915%25%7Cresize%2C600%2C5000',
          title: 'Cemig',
          text: 'Desenvolvimento de solução integrada para diagnósticos precisos sobre o estado de vida das baterias chumbo-ácido.',
          imageStyle: { backgroundSize: 'contain', backgroundColor: '#fff' },
        },
        {
          image: 'https://images.builderservices.io/s/cdn/v1.0/i/m?url=https%3A%2F%2Fstorage.googleapis.com%2Fproduction-hostgator-brasil-v1-0-5%2F725%2F1528725%2F01Y0yIm7%2F19c69bc6e6fc403ead41563c351eb67e&methods=crop%2C0%25%2C22.067%25%2C100%25%2C55.8659%25%7Cresize%2C600%2C5000',
          title: 'Senai',
          text: 'Esforço colaborativo para elevar o nível de maturidade tecnológica (TRL) e de fabricação (MRL).',
          imageStyle: { backgroundSize: 'contain', backgroundColor: '#fff' },
        },
        {
          image: 'https://images.builderservices.io/s/cdn/v1.0/i/m?url=https%3A%2F%2Fstorage.googleapis.com%2Fproduction-hostgator-brasil-v1-0-5%2F725%2F1528725%2F01Y0yIm7%2F8396ffb732814aa2a225d62cc7232808&methods=crop%2C0%25%2C17.1053%25%2C100%25%2C65.7895%25%7Cresize%2C600%2C5000',
          title: 'Sesi ODS ISG',
          text: 'Desenvolvimento de um sistema integrado para separação de componentes de painéis fotovoltaicos.',
          imageStyle: { backgroundSize: 'contain', backgroundColor: '#fff' },
        },
      ];

  return (
    <section id="projetos" className="projects-section">
      <div className="container">
        <h2 className="section-title">Projetos</h2>
        <div className="cards-grid">
          {projects.map(project => (
            <Card key={project.title} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
}