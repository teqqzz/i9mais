import React from 'react';
import { useHomeContent } from '../hooks/useHomeContent';
import { LoadingSpinner } from './LoadingSpinner';

export function UniqueApproachSection() {
  const { homeContent, isLoading } = useHomeContent();

 return (
  <section className="unique-approach-section">
   <div className="container">
    <h2 className="section-title">Nossa Abordagem Única</h2>
        {isLoading || !homeContent ? (
            <LoadingSpinner />
        ) : (
            <div className="approach-grid">
         <div className="approach-item">
          <span className="icon">♻️</span>
          <h3>{homeContent.approach1Title}</h3>
          <p>{homeContent.approach1Text}</p>
         </div>
         <div className="approach-item">
          <span className="icon">🔬</span> 
          <h3>{homeContent.approach2Title}</h3>
          <p>{homeContent.approach2Text}</p>
         </div>
         <div className="approach-item">
          <span className="icon">📊</span> 
          <h3>{homeContent.approach3Title}</h3>
          <p>{homeContent.approach3Text}</p>
         </div>
        </div>
        )}
   </div>
  </section>
 );
}