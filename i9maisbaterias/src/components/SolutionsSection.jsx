import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { API_URL } from "@/config";
import "swiper/css";
import "swiper/css/navigation";
import { formatImageUrl } from "../utils/formatImageUrl"; // <-- IMPORTA O HELPER

// Componente para cada cartão de solução (AJUSTADO)
function SolutionCard({ slug, image, title, text, linkText, imageStyleClass }) {
  // Usa o helper para obter a URL correta
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
        <Link to={`/solucoes/${slug}`} className="card-link">
          {linkText} &rarr;
        </Link>
      </div>
    </div>
  );
}

// Componente da Seção de Soluções
export function SolutionsSection() {
  const [solutions, setSolutions] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/api/solucoes?page=1&limit=100`)
      .then((res) => res.json())
      .then((data) => setSolutions(data.posts))
      .catch((err) => console.error("Erro ao buscar solucoes:", err));
  }, []);

  if (!solutions.length) {
    return null;
  }

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
          {solutions.map((solution) => (
            <SwiperSlide key={solution.slug}>
              <SolutionCard
                slug={solution.slug}
                image={solution.image_url}
                title={solution.title}
                text={solution.summary}
                linkText="Conheça a Solução"
                imageStyleClass={solution.image_style}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
