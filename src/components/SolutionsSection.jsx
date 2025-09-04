import React from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

function SolutionCard({ slug, image, title, text, linkText }) {
  const itemImageStyle = { backgroundImage: `url('${image}')` };
  return (
    <div className="card">
      <div className="card-image" style={itemImageStyle}></div>
      <div className="card-content">
        <h3>{title}</h3>
        <p>{text}</p>
        <Link to={`/solucoes/${slug}`} className="card-link">{linkText} &rarr;</Link>
      </div>
    </div>
  );
}

export function SolutionsSection() {
    const solutions = [
        {
          slug: 'second-life',
          image: 'https://images.builderservices.io/s/cdn/v1.0/i/m?url=https%3A%2F%2Fstorage.googleapis.com%2Fproduction-hostgator-brasil-v1-0-5%2F725%2F1528725%2F01Y0yIm7%2F0c99d7a0379846a19e9da030eae2244d&methods=resize%2C600%2C5000',
          title: 'Second Life (Economia Circular)',
          text: 'Damos uma segunda vida a baterias usadas de VEs, transformando-as em soluções de armazenamento de energia para novas aplicações.',
          linkText: 'Conheça o Processo',
        },
        {
          slug: 'tecnologia-diagnostico',
          image: 'https://images.builderservices.io/s/cdn/v1.0/i/m?url=https%3A%2F%2Fstorage.googleapis.com%2Fproduction-hostgator-brasil-v1-0-5%2F725%2F1528725%2F01Y0yIm7%2F46b86cd529504bc6a03ea8b3d00390e9&methods=crop%2C0%25%2C24.0006%25%2C100%25%2C47.9616%25%7Cresize%2C600%2C5000',
          title: 'Tecnologia de Diagnóstico',
          text: 'Desenvolvemos hardware e software avançados para medição precisa do Estado de Saúde (SoH) e vida útil de baterias.',
          linkText: 'Nossas Soluções B2B',
        },
        {
          slug: 'armazenamento-fotovoltaico',
          image: 'https://images.builderservices.io/s/cdn/v1.0/i/m?url=https%3A%2F%2Fstorage.googleapis.com%2Fproduction-hostgator-brasil-v1-0-5%2F725%2F1528725%2F01Y0yIm7%2F4c3ebbdd05c047cd9d84aab4d3e5e0b6&methods=crop%2C17.6867%25%2C17.4243%25%2C74.3494%25%2C55.7839%25%7Cresize%2C600%2C5000',
          title: 'Armazenamento Fotovoltaico',
          text: 'Integramos baterias de second life em sistemas fotovoltaicos, oferecendo soluções de armazenamento de energia limpa e acessível.',
          linkText: 'Projetos Sustentáveis',
        },
        {
          slug: 'eletromobilidade',
          image: 'https://images.builderservices.io/s/cdn/v1.0/i/m?url=https%3A%2F%2Fstorage.googleapis.com%2Fproduction-hostgator-brasil-v1-0-5%2F725%2F1528725%2F01Y0yIm7%2Fca0d9abfda7f4f4f902de283a7806877&methods=resize%2C600%2C5000',
          title: 'Eletromobilidade',
          text: 'Focamos em soluções de hardware e software que impulsionam o futuro da mobilidade elétrica, otimizando a performance e vida útil das baterias.',
          linkText: 'Futuro da Mobilidade',
        },
      ];

  return (
    <section id="solucoes" className="solutions-section">
      <div className="container">
        <h2 className="section-title">Nossas Frentes de Atuação</h2> 
        <Swiper
          modules={[Navigation]}
          navigation
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {solutions.map(solution => (
            <SwiperSlide key={solution.slug}>
              <SolutionCard {...solution} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}