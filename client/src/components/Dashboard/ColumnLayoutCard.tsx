import React from 'react';
import './ColumnLayoutCard.css';

interface ColumnLayoutCardProps {
    title: string;
    description: string;
    children?: React.ReactNode; 
    titleStyle?: React.CSSProperties;
    descriptionStyle?: React.CSSProperties;
    header?: React.ReactNode;
}

const ColumnLayoutCard: React.FC<ColumnLayoutCardProps> = ({ 
    title, 
    description, 
    children,
    titleStyle,
    descriptionStyle,
    header
 }) => {
    return (
        <div className="card h-100 shadow-lg p-3 mb-5 bg-white rounded responsive-card"
            style={{justifyContent: 'center'}}>
            {header && (
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '15px' }}>
                    {header}
                </div>
            )}
            <h5 className="card-title" style={titleStyle}>{title}</h5>
            <p className="card-text" style={descriptionStyle}>{description}</p>
            <div className="card-body">
                {children} 
            </div>
        </div>
    );
}

export default ColumnLayoutCard;
