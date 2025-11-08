import React from 'react';
import { LoadingSpinner } from './LoadingSpinner';
import { formatImageUrl } from '../utils/formatImageUrl';

export function Hero({ content }) {
  const heroStyle = {
  backgroundImage: `url('${formatImageUrl(content?.heroImageUrl)}')`
 };

 return (
  <section className="hero-section" style={heroStyle}>
   <div className="hero-content">
        {!content ? (
            <LoadingSpinner />
        ) : (
            <>
                <h1>{content.heroTitle}</h1>
                <p>{content.heroSubtitle}</p>
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