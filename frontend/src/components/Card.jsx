  import React from 'react';

// Componente Card reutilizável
  export function Card({ image, title, text, link, imageStyle = {} }) {
    const cardImageStyle = {
      backgroundImage: `url('${image}')`,
      ...imageStyle,
    };

    return (
      <div className="card">
        <div className="card-image" style={cardImageStyle}></div>
        <div className="card-content">
          <h3>{title}</h3>
          <p>{text}</p>
          {link && <a href="#" className="card-link">{link} &rarr;</a>}
        </div>
      </div>
    );
  }