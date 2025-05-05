import React from 'react';
import './EmailSentCard.css';

interface EmailSentCardProps {
    title: string;
    description: string;
    sub_description: string;
    children?: React.ReactNode;
}

const EmailSentCard: React.FC<EmailSentCardProps> = ({ title, description, sub_description, children }) => {
    return (
        <div className="card h-100 shadow-lg p-3 mb-5 bg-white rounded responsive-card">
            <div className="card-body">
    
                <div className="d-flex align-items-center mb-2">
                    <h5 className="card-title mb-0 icon-mail">{title}</h5>
                </div>

                <p className="card-text text-pos">{description}</p>
                <p className="card-text d-inline text-pos">
                    {sub_description} {children}
                </p>
            </div>
        </div>
    );
}

export default EmailSentCard;
