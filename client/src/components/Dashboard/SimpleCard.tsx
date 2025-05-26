import React from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './SimpleCard.css'; 

interface SimpleCardProps {
    title: string;
    onClick?: () => void; 
}

const SimpleCard: React.FC<SimpleCardProps> = ({ title, onClick }) => {
    return (
        <div
            className="card h-100 shadow p-3 mb-5 bg-white rounded responsive-card click-effect "
            onClick={onClick} 
            style={{ cursor: 'pointer', maxWidth: '300px' , maxHeight: '200px' }} 
        >
            <div className="card-body">
                <div className="d-flex align-items-center justify-content-between mt-5">
                    <h5 className="card-title mb-0 me-5">{title}</h5>
                    <i className="bi bi-chevron-right bold-icon"></i> 
                </div>
            </div>
        </div>
    );
};

export default SimpleCard;