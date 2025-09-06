import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { Link } from 'react-router-dom';

import 'swiper/css';
import 'swiper/css/navigation';

function CarouselItem({ slug, image, title, text, imageStyle = {} }) {
  const itemImageStyle = { backgroundImage: `url('${image}')`, ...imageStyle };
  
  return (
    <div className="card">
      <div className="card-image" style={itemImageStyle}></div>
      <div className="card-content">
        <h3>{title}</h3>
        <p>{text}</p>
        <Link to={`/projetos/${slug}`} className="card-link">Leia Mais &rarr;</Link>
      </div>
    </div>
  );
}

export function ProjectCarousel() {
    const projects = [
        {
          slug: 'tecpar-tracador-curva-solar',
          date: '2023-04-14',
          image: '/public/images/tecpar-tracador-curva-solar.jpg',
          title: 'Tecpar - Traçador de Curva Solar',
          text: 'Desenvolvimento de equipamento de baixo custo para avaliar a eficiência e degradação de painéis solares.',
          imageStyle: { backgroundSize: 'contain', backgroundColor: '#fff' }
        },
        {
          slug: 'rota-2030-pd-baterias',
          date: '2024-02-20',
          image: '/public/images/rota-2030-pd-baterias.jpg',
          title: 'Rota 2030 - P&D em Baterias',
          text: 'Investimento em pesquisa e desenvolvimento de tecnologia nacional para baterias, visando autonomia e inovação.',
        },
        {
          slug: 'ageuni-mini-usinas',
          date: '2023-08-10',
          image: '/public/images/ageuni-mini-usinas.jpg',
          title: 'Ageuni - Mini Usinas Solares',
          text: 'Instalação de duas mini usinas solares de 3.5 kW em locais remotos, promovendo acesso à energia sustentável.',
          imageStyle: { backgroundSize: 'contain', backgroundColor: '#fff' }
        },
        {
          slug: 'embrapii-tracador-curva',
          date: '2023-11-05',
          image: '/public/images/embrapii-tracador-curva.jpg',
          title: 'EMBRAPII - Traçador de Curva I-V',
          text: 'Desenvolvimento de hardware e software para diagnóstico preciso da saúde de baterias, essencial para o reuso seguro.',
          imageStyle: { backgroundSize: 'contain', backgroundColor: '#fff' }
        },
        {
          slug: 'cnpq-utfpr-plataforma-dados',
          date: '2024-01-15',
          image: '/public/images/cnpq-utfpr-plataforma-dados.jpg',
          title: 'CNPq & UTFPR - Plataforma de Dados',
          text: 'Iniciativa para centralizar e analisar informações de fabricantes de baterias, otimizando o mercado de VEs.',
          imageStyle: { backgroundSize: 'contain', backgroundColor: '#fff' }
        },
        {
          slug: 'cemig-gestao-ativos',
          date: '2023-09-22',
          image: '/public/images/cemig-gestao-ativos.jpg',
          title: 'CEMIG - Gestão de Ativos Energéticos',
          text: 'Otimização da gestão de baterias chumbo-ácido em grandes frotas, prolongando sua vida útil e reduzindo custos.',
          imageStyle: { backgroundSize: 'contain', backgroundColor: '#fff' }
        },
        {
          slug: 'senai-maturidade-tecnologica',
          date: '2024-03-01',
          image: '/public/images/senai-maturidade-tecnologica.jpg',
          title: 'Senai - Maturidade Tecnológica',
          text: 'Esforço colaborativo para elevar o nível de maturidade tecnológica (TRL) para um estágio próximo à escala industrial.',
          imageStyle: { backgroundSize: 'contain', backgroundColor: '#fff' }
        },
        {
          slug: 'sesi-ods-isg-economia-circular',
          date: '2023-10-18',
          image: '/public/images/sesi-ods-isg-economia-circular.jpg',
          title: 'Sesi ODS ISG - Economia Circular',
          text: 'Desenvolvimento de um sistema integrado para separação de componentes de painéis fotovoltaicos.',
          imageStyle: { backgroundSize: 'contain', backgroundColor: '#fff' }
        },
        {
          slug: 'instituto-jaime-lerner-smart-mobility',
          date: '2024-04-05',
          image: '/public/images/instituto-jaime-lerner-smart-mobility.jpg',
          title: 'Inst. Jaime Lerner - Smart Mobility',
          text: 'Parceria para o desenvolvimento de soluções de mobilidade urbana inteligente, aplicando baterias de silício-enxofre.',
          imageStyle: { backgroundSize: 'contain', backgroundColor: '#fff' }
        },
      ];

  const sortedProjects = projects.sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <section id="projetos" className="projects-section">
      <div className="container">
        <h2 className="section-title">Nossos Projetos</h2>
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
          {sortedProjects.map(project => (
            <SwiperSlide key={project.slug}>
              <CarouselItem {...project} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}