import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Link } from "react-router-dom";
import { API_URL } from "@/config";
import "swiper/css";
import "swiper/css/navigation";
import { formatImageUrl } from "../utils/formatImageUrl"; // <-- IMPORTA O HELPER

// Componente para cada item do carrossel (AJUSTADO)
function CarouselItem({ slug, image, title, text, imageStyleClass }) {
  // Usa o helper para obter a URL correta (seja ela do Supabase ou local)
  const finalImageUrl = formatImageUrl(image);

  const itemImageStyle = {
    backgroundImage: `url('${finalImageUrl}')`, // <-- Usa a URL formatada
  };

  const cardImageClassName = `card-image ${
    imageStyleClass === "contain" ? "style-contain" : ""
  }`;

  return (
    <div className="card">
      <div className={cardImageClassName} style={itemImageStyle}></div>
      <div className="card-content">
        <h3>{title}</h3>
        <p>{text}</p>
        <Link to={`/blog/${slug}`} className="card-link">
          Leia Mais &rarr;
        </Link>
      </div>
    </div>
  );
}

// Componente do Carrossel de Blog
export function BlogCarousel() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/api/artigos?page=1&limit=100`)
      .then((res) => res.json())
      .then((data) => setPosts(data.posts))
      .catch((err) => console.error("Erro ao buscar artigos:", err));
  }, []);

  if (!posts.length) {
    return null;
  }

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
          {posts.map((post) => (
            <SwiperSlide key={post.slug}>
              <CarouselItem
                slug={post.slug}
                image={post.image_url}
                title={post.title}
                text={post.summary}
                imageStyleClass={post.image_style}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
