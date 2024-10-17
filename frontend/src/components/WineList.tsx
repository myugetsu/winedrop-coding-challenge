import React from 'react';
import './WineList.css';

interface Wine {
  name: string;
  vintage: number;
  totalRevenue: number;
  totalBottles: number;
  totalOrders: number;
  highlight?: 'top' | 'bottom';
}

interface WineListProps {
  wines: Wine[];
}

const WineList: React.FC<WineListProps> = ({ wines }) => {
  return (
    <ul className="wine-list">
      {wines.map((wine, index) => (
          <li key={index}  className={`wine-item ${wine.highlight === 'top' ? 'highlight-top' : wine.highlight === 'bottom' ? 'highlight-bottom' : ''}`}>
              <span>{index + 1}. {wine.name} - £{wine.totalRevenue.toFixed(2)}</span>
          </li>
      ))}
    </ul>
  );
};

export default WineList;


