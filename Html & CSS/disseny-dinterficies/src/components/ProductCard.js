import React, { useState } from 'react';
import './ProductCard.css';
 
const ProductCard = ({ initialSoldOut = false }) => {
  // 1) Estat de producte esgotat
  const [isSoldOut] = useState(initialSoldOut);
 
  // 2) Classe BEM amb modificador quan isSoldOut === true
  const cardClassName = `product-card${isSoldOut ? ' product-card--sold-out' : ''}`;
 
  return (
    <div className={cardClassName}>
      <div className="product-image">
        <img
          src="https://acdn-us.mitiendanube.com/stores/001/593/734/products/ng-a100bt-rj-angulo-554a80fc2c8cfb6e8316986747330025-640-0.webp"
          alt="Producte Genèric"
        />
      </div>
 
      <div className="product-info">
        <h2 className="product-title">Auriculars Inalàmbrics Pro</h2>
 
        <p className="product-description">
          Cancel·lació de soroll avançada, 30 hores de bateria i so d'alta fidelitat.
          El disseny ergonòmic garanteix la màxima comoditat.
        </p>
 
        <div className="product-price-section">
          <span className="current-price">99,99 €</span>
          <span className="old-price">149,99 €</span>
        </div>
 
        {/* 4) Deshabilitar el botó i canviar el text quan estigui esgotat */}
        <button
          className="add-to-cart-btn"
          disabled={isSoldOut}
        >
          {isSoldOut ? 'Esgotat' : 'Afegir a la cistella'}
        </button>
      </div>
    </div>
  );
};
 
export default ProductCard;
