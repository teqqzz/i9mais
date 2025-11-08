import React from 'react';
import { LoadingSpinner } from './LoadingSpinner';

export function UniqueApproachSection({ content }) {
 return (
  <section className="unique-approach-section">
   <div className="container">
    <h2 className="section-title">Nossa Abordagem Única</h2>
        {!content || !content.blocks ? (
            <LoadingSpinner />
        ) : (
            <div className="approach-grid">
                {content.blocks.map(block => (
                    <div className="approach-item" key={block.id}>
                        <span className="icon">{block.icon}</span>
                        <h3>{block.title}</h3>
                        <p>{block.text}</p>
                    </div>
                ))}
        </div>
        )}
   </div>
  </section>
 );
}