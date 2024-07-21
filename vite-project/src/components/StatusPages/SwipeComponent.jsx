import React, { useState, useRef } from 'react';

const SwipeComponent = () => {
  const [showDiv, setShowDiv] = useState(false);
  const [startY, setStartY] = useState(null);
  const containerRef = useRef(null);

  const handleSwipe = (startY, endY) => {
    const swipeDistance = startY - endY;
    const containerHeight = containerRef.current.clientHeight;

    if (swipeDistance >= containerHeight * 0.1) {
      setShowDiv(true);
    } else {
      setShowDiv(false);
    }
  };

  const handleTouchStart = (e) => {
    setStartY(e.touches[0].clientY);
    
  };

  const handleTouchMove = (e) => {
    if (startY !== null) {
      const endY = e.touches[0].clientY;
      handleSwipe(startY, endY);
    }
  };

  const handleTouchEnd = () => {
    setStartY(null);
  };
console.log(startY);
  return (
    <div
      className="container"
      ref={containerRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className={`inner-div ${showDiv ? 'show' : ''}`}>
        This is the hidden div
      </div>
    </div>
  );
};

export default SwipeComponent;
