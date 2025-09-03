import React from 'react';
import { Card } from './Card';

export function SolutionsSection() {
    const solutions = [
        {
          image: 'https://images.builderservices.io/s/cdn/v1.0/i/m?url=https%3A%2F%2Fstorage.googleapis.com%2Fproduction-hostgator-brasil-v1-0-5%2F725%2F1528725%2F01Y0yIm7%2F0c99d7a0379846a19e9da030eae2244d&methods=resize%2C600%2C5000',
          title: 'Second Life',
          text: 'Oferecemos baterias requalificadas que promovem a economia circular. Nosso processo envolve a recuperação e revitalização de baterias.',
          link: 'Saiba Mais',
        },
        {
          image: 'https://images.builderservices.io/s/cdn/v1.0/i/m?url=https%3A%2F%2Fstorage.googleapis.com%2Fproduction-hostgator-brasil-v1-0-5%2F725%2F1528725%2F01Y0yIm7%2F46b86cd529504bc6a03ea8b3d00390e9&methods=crop%2C0%25%2C24.0006%25%2C100%25%2C47.9616%25%7Cresize%2C600%2C5000',
          title: 'Tecnologia',
          text: 'Desenvolvemos tecnologias avançadas para medir o estado e a vida útil de baterias, auxiliando no monitoramento da eficiência.',
          link: 'Saiba Mais',
        },
        {
          image: 'https://images.builderservices.io/s/cdn/v1.0/i/m?url=https%3A%2F%2Fstorage.googleapis.com%2Fproduction-hostgator-brasil-v1-0-5%2F725%2F1528725%2F01Y0yIm7%2F4c3ebbdd05c047cd9d84aab4d3e5e0b6&methods=crop%2C17.6867%25%2C17.4243%25%2C74.3494%25%2C55.7839%25%7Cresize%2C600%2C5000',
          title: 'Fotovoltaica',
          text: 'Fornecemos instalações de painéis solares requalificados, conectando sustentabilidade e economia com energia limpa e acessível.',
          link: 'Saiba Mais',
        },
        {
          image: 'https://images.builderservices.io/s/cdn/v1.0/i/m?url=https%3A%2F%2Fstorage.googleapis.com%2Fproduction-hostgator-brasil-v1-0-5%2F725%2F1528725%2F01Y0yIm7%2Fca0d9abfda7f4f4f902de283a7806877&methods=resize%2C600%2C5000',
          title: 'Eletromobilidade',
          text: 'Desenvolvemos hardware e software para veículos movidos por eletricidade, impulsionando o futuro da mobilidade urbana.',
          link: 'Saiba Mais',
        },
      ];

  return (
    <section id="solucoes" className="business-areas">
      <div className="container">
        <h2 className="section-title">Nossa Solução</h2>
        <div className="cards-grid">
          {solutions.map(solution => (
            <Card key={solution.title} {...solution} />
          ))}
        </div>
      </div>
    </section>
  );
}