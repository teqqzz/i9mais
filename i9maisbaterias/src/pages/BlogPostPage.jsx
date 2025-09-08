import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { API_URL } from "@/config";
import { formatImageUrl } from "../utils/formatImageUrl"; // <-- IMPORTA O HELPER

// Componente da Página de Post do Blog
export function BlogPostPage() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Buscar o post ao carregar o componente
  useEffect(() => {
    setLoading(true);
    fetch(`${API_URL}/api/artigos/${slug}`)
      .then((res) => {
        if (!res.ok) throw new Error("Post não encontrado");
        return res.json();
      })
      .then((data) => {
        setPost(data);
        setLoading(false);
      })
      .catch((err) => {
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

  if (error || !post) {
    return (
      <div className="container page-content">
        <h2>Post não encontrado!</h2>
      </div>
    );
  }

  const headerClassName = `page-header ${
    post.image_style === "contain" ? "style-contain" : ""
  }`;
  const finalImageUrl = formatImageUrl(post.image_url); 

  return (
    <div className="page-container">
      <div
        className={headerClassName}
        style={{ backgroundImage: `url('${finalImageUrl}')` }} 
      >
        <h1>{post.title}</h1>
      </div>
      <div className="container page-content">
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
        <Link to="/" className="cta-button back-button">
          Voltar para a Home
        </Link>
      </div>
    </div>
  );
}
