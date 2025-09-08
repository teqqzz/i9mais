import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { API_URL } from "@/config";
import { formatImageUrl } from "../utils/formatImageUrl"; // <-- IMPORTA O HELPER

// Componente da Página de Projeto
export function ProjectPage() {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Buscar o projeto ao carregar o componente
  useEffect(() => {
    setLoading(true);
    fetch(`${API_URL}/api/projetos/${slug}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Projeto não encontrado");
        }
        return res.json();
      })
      .then((data) => {
        setProject(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <div className="container page-content">
        <h2>Carregando...</h2>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="container page-content">
        <h2>Projeto não encontrado!</h2>
        <Link to="/" className="cta-button back-button">
          Voltar para a Home
        </Link>
      </div>
    );
  }

  const headerClassName = `page-header ${
    project.image_style === "contain" ? "style-contain" : ""
  }`;
  const finalImageUrl = formatImageUrl(project.image_url); // <-- USA O HELPER

  return (
    <div className="page-container">
      <div
        className={headerClassName}
        style={{ backgroundImage: `url('${finalImageUrl}')` }} // <-- USA A URL FORMATADA
      >
        <h1>{project.title}</h1>
      </div>
      <div className="container page-content">
        <div dangerouslySetInnerHTML={{ __html: project.content }} />
        <Link to="/#projetos" className="cta-button back-button">
          Ver outros projetos
        </Link>
      </div>
    </div>
  );
}
