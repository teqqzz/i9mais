import React from 'react';
import { useHomeContent } from '../hooks/useHomeContent';
import { LoadingSpinner } from './LoadingSpinner';
import { formatImageUrl } from '../utils/formatImageUrl';

export function Hero() {
  const { homeContent, isLoading } = useHomeContent();

  // Define um estilo de fallback enquanto carrega ou se falhar
  const fallbackHeroStyle = {
  backgroundImage: "url('https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExODNtcjdjcHEyd2Fyd3NnZXA2d2JpOGNkb3hycTl1bzBva2xna3BzOCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/4CpdsmxdDpcmQ/giphy.gif')"
 };
  
  // Cria o estilo dinâmico quando o conteúdo estiver pronto
  const heroStyle = (isLoading || !homeContent?.heroImageUrl)
    ? fallbackHeroStyle
    : { backgroundImage: `url('${formatImageUrl(homeContent.heroImageUrl)}')` };

 return (
  <section className="hero-section" style={heroStyle}>
   <div className="hero-content">
        {(isLoading || !homeContent) ? (
            <LoadingSpinner />
        ) : (
            <>
                <h1>{homeContent.heroTitle}</h1>
                <p>{homeContent.heroSubtitle}</p>
            </>
        )}
    <div className="hero-cta-group">
      <a href="#calculadora" className="cta-button">Calcule sua Economia Agora</a>
      <a href="#solucoes" className="cta-button secondary">Nossas Soluções &rarr;</a>
    </div>
   </div>
  </section>
 );
}