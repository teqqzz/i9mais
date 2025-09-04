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
          slug: 'ageuni-mini-usinas',
          image: 'https://images.pexels.com/photos/10323945/pexels-photo-10323945.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          title: 'Ageuni - Mini Usinas Solares',
          text: 'Instalação de duas mini usinas solares de 3.5 kW em locais remotos, promovendo acesso à energia sustentável.',
        },
        {
          slug: 'embrapii-tracador-curva',
          image: 'https://images.pexels.com/photos/3861972/pexels-photo-3861972.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          title: 'EMBRAPII - Traçador de Curva I-V',
          text: 'Desenvolvimento de hardware e software para diagnóstico preciso da saúde de baterias, essencial para o reuso seguro.',
        },
        {
          slug: 'cnpq-utfpr-plataforma-dados',
          image: 'https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          title: 'CNPq & UTFPR - Plataforma de Dados',
          text: 'Iniciativa para centralizar e analisar informações de fabricantes de baterias, otimizando o mercado de veículos elétricos.',
        },
        {
          slug: 'cemig-gestao-ativos',
          image: 'https://images.pexels.com/photos/6803274/pexels-photo-6803274.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          title: 'CEMIG - Gestão de Ativos Energéticos',
          text: 'Otimização da gestão de baterias chumbo-ácido em grandes frotas, prolongando sua vida útil e reduzindo custos operacionais.',
        },
        {
          slug: 'rota-2030-pd-baterias',
          image: 'https://images.pexels.com/photos/731118/pexels-photo-731118.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          title: 'Rota 2030 - P&D em Baterias',
          text: 'Investimento em pesquisa e desenvolvimento de tecnologia nacional para baterias, visando autonomia e inovação no setor automotivo.',
        },
      ];

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
          {projects.map(project => (
            <SwiperSlide key={project.slug}>
              <CarouselItem {...project} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}