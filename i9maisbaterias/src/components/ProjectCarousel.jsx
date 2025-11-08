import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { Link } from 'react-router-dom';
import { API_URL } from '@/config';
import 'swiper/css';
import 'swiper/css/navigation';
import { formatImageUrl } from '../utils/formatImageUrl';
import { LoadingSpinner } from './LoadingSpinner';

function CarouselItem({ slug, image, title, text, imageStyle = {} }) {
 const finalImageUrl = formatImageUrl(image);
  const itemImageStyle = { 
  backgroundImage: `url('${finalImageUrl}')`, 
  ...imageStyle 
 };
 
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
 const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

 useEffect(() => {
    setIsLoading(true);
  fetch(`${API_URL}/api/projetos?page=1&limit=100`)
   .then(res => {
          if (!res.ok) throw new Error('Falha ao buscar projetos');
          return res.json();
      })
   .then(data => {
        if (Array.isArray(data.posts)) {
        setProjects(data.posts); 
        } else {
            setProjects([]);
        }
   })
   .catch(err => {
        console.error("Erro ao buscar projetos:", err);
        setProjects([]);
      })
      .finally(() => {
          setIsLoading(false);
      });
 }, []);

 return (
  <section id="projetos" className="projects-section">
   <div className="container">
    <h2 className="section-title">Nossos Projetos</h2>
        {isLoading ? (
            <LoadingSpinner />
        ) : (
            projects.length > 0 && (
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
               <CarouselItem 
                slug={project.slug}
                image={project.image_url}
                title={project.title}
                text={project.summary}
               />
              </SwiperSlide>
             ))}
            </Swiper>
            )
        )}
   </div>
  </section>
 );
}