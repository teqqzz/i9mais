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
          image: '/src/images/second-life.jpg',
          title: 'Second Life (Economia Circular)',
          text: 'Damos uma segunda vida a baterias usadas de VEs, transformando-as em soluções de armazenamento de energia para novas aplicações.',
          linkText: 'Conheça o Processo',
        },
        {
          slug: 'tecnologia-diagnostico',
          image: '/src/images/tecnologia-diagnostico.jpg',
          title: 'Tecnologia de Diagnóstico',
          text: 'Desenvolvemos hardware e software avançados para medição precisa do Estado de Saúde (SoH) e vida útil de baterias.',
          linkText: 'Nossas Soluções B2B',
        },
        {
          slug: 'armazenamento-fotovoltaico',
          image: '/src/images/armazenamento-fotovoltaico.jpg',
          title: 'Armazenamento Fotovoltaico',
          text: 'Integramos baterias de second life em sistemas fotovoltaicos, oferecendo soluções de armazenamento de energia limpa e acessível.',
          linkText: 'Projetos Sustentáveis',
        },
        {
          slug: 'eletromobilidade',
          image: '/src/images/eletromobilidade.jpg',
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