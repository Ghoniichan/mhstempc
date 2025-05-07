import React from 'react';
import './ColumnLayoutCard.css';

interface ColumnLayoutCardProps {
    title: string;
    description: string;
    children?: React.ReactNode; 
}

const ColumnLayoutCard: React.FC<ColumnLayoutCardProps> = ({ title, description, children }) => {
    return (
        <div className="card h-100 shadow-lg p-3 mb-5 bg-white rounded responsive-card">
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{description}</p>
                {children} 
            </div>
        </div>
    );
}

export default ColumnLayoutCard;
