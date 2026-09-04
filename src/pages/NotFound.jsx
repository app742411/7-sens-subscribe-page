import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="not-found-container">
      {/* Background artwork */}
      <div className="bg-canvas-luxury">
        <div className="hero-art-bg" />
      </div>

      <div className="not-found-card">
        <Link to="/" style={{ display: 'inline-block', marginBottom: '1.5rem' }}>
          <img src="/7sens.webp" alt="7Sens" style={{ height: '48px', width: 'auto' }} />
        </Link>

        <div className="not-found-icon">
          <Compass size={42} color="#C5A059" />
        </div>

        <h1 className="not-found-code">404</h1>
        <h2 className="not-found-title">Page Not Found</h2>
        <p className="not-found-desc">
          The requested page could not be found or may have been moved.
        </p>

        <Link to="/" className="btn-not-found-home">
          <ArrowLeft size={16} />
          <span>Return to Home</span>
        </Link>
      </div>
    </div>
  );
}
