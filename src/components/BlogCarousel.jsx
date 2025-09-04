import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { Link } from 'react-router-dom';

import 'swiper/css';
import 'swiper/css/navigation';

function CarouselItem({ slug, image, title, text }) {
  const itemImageStyle = { backgroundImage: `url('${image}')` };
  return (
    <div className="card">
      <div className="card-image" style={itemImageStyle}></div>
      <div className="card-content">
        <h3>{title}</h3>
        <p>{text}</p>
        <Link to={`/blog/${slug}`} className="card-link">Leia Mais &rarr;</Link>
      </div>
    </div>
  );
}

export function BlogCarousel() {
  const posts = [
    {
      slug: 'futuro-eletrico-economia-circular',
      image: 'https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      title: 'O Futuro é Elétrico: Como a Economia Circular Impacta o Mercado de EVs',
      text: 'Analisamos como a requalificação de baterias está diminuindo custos e impulsionando a adoção de veículos elétricos no Brasil.',
    },
    {
      slug: 'deep-tech-investimento-pd',
      image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      title: 'Deep Tech: Por que o Brasil precisa investir em P&D para baterias',
      text: 'Uma visão sobre a importância estratégica de desenvolver tecnologia nacional, como nossa parceria no programa Rota 2030.',
    },
    {
      slug: 'case-sucesso-diagnostico-cemig',
      image: 'https://images.pexels.com/photos/6803274/pexels-photo-6803274.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      title: 'Case de Sucesso: O Diagnóstico de Baterias Chumbo-Ácido com a CEMIG',
      text: 'Entenda como nosso hardware e software proprietários estão ajudando a otimizar a gestão de ativos energéticos de grandes frotas.',
    },
    {
      slug: 'big-data-ia-gestao-baterias',
      image: 'https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      title: 'Big Data e I.A. na Gestão de Baterias: A Próxima Fronteira',
      text: 'Nossa plataforma de dados está revolucionando como o mercado entende e utiliza baterias. Conheça o projeto com CNPq e UTFPR.',
    },
  ];

  return (
    <section id="blog" className="blog-section">
      <div className="container">
        <h2 className="section-title">Blog & Novidades</h2>
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
          {posts.map(post => (
            <SwiperSlide key={post.slug}>
              <CarouselItem {...post} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}