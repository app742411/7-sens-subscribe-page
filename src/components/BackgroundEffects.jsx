import React from 'react';

export default function BackgroundEffects() {
  return (
    <div className="bg-canvas-luxury">
      <div
        style={{
          position: 'fixed',
          inset: 0,
          backgroundImage: `url('/hero2.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          zIndex: 0,
        }}
      />
    </div>
  );
}
