import React from 'react';
import './index.css';

const MasterPage = () => {
  return (
    <div className="container">
      <div className="pivot-table-section">
        <div className="pivot-table-buttons">
          <p>Pivot Table Buttons</p>
        </div>
        <div className="pivot-table-component">
          <p>Pivot Table Component</p>
        </div>
      </div>
      <div className="carousel-section">
        <div className="carousel-buttons">
          <p>Carrousel Buttons</p>
        </div>
        <div className="carousel-component">
          <p>Carrousel Component</p>
        </div>
      </div>
    </div>
  );
};

export default MasterPage;