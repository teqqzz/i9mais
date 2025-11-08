import React from 'react';
import { useHomeContent } from '../hooks/useHomeContent';
import { LoadingSpinner } from './LoadingSpinner';

export function Hero() {
  const { homeContent, isLoading } = useHomeContent();

const heroStyle = {
backgroundImage: "url('https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExODNtcjdjcHEyd2Fyd3NnZXA2d2JpOGNkb3hycTl1bzBva2xna3BzOCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/4CpdsmxdDpcmQ/giphy.gif')"
};

return (
<section className="hero-section" style={heroStyle}>
<div className="hero-content">
        {isLoading || !homeContent ? (
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