import React, { useState } from 'react'
import './ProductCard.css'

const ProductCard = ({ initialSoldOut = false }) => {
  const [isSoldOut] = useState(initialSoldOut)

  // BEM: bloc base + modificador "--sold-out"
  const cardClassName = `product-card${isSoldOut ? ' product-card--sold-out' : ''}`

  return (
    <div className={cardClassName}>
      <div className="product-image">
        <img
          src="https://acdn-us.mitiendanube.com/stores/001/593/734/products/ng-a100bt-rj-angulo-554a80fc2c8cfb6e8316986747330025-640-0.webp"
          alt="Auriculars Inalàmbrics Pro"
        />
      </div>

      <div className="product-info">
        <h2 className="product-title">Auriculars Inalàmbrics Pro</h2>
        <p className="product-description">
          Cancel·lació de soroll avançada, 30 hores de bateria i so d'alta fidelitat.
          El disseny ergonòmic garanteix la màxima comoditat.
        </p>

        {/* SECCIÓ PREUS (Extensió 3: badge OFERTA + flex-grow) */}
        <div className="product-price-section">
          <span className="current-price">99,99 €</span>
          <span className="old-price">149,99 €</span>
          {/* Element espaiador amb flex-grow: 1 per empènyer el badge a la dreta */}
          <span className="price-spacer"></span>
          <span className="discount-badge">🔥 OFERTA</span>
        </div>

        <button
          className="add-to-cart-btn"
          disabled={isSoldOut}
        >
          {isSoldOut ? 'Esgotat' : 'Afegir a la cistella'}
        </button>
      </div>
    </div>
  )
}

export default ProductCard