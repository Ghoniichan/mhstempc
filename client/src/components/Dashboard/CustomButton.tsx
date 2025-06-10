import '../../../src/styles/custom-bootsrap.scss';
import './CustomButton.css';

type CustomButtonProps = {
    label: string;
    type?: "button" | "submit";
    onClick?: () => void;
    className?: string;
    disabled?: boolean;
};

const CustomButton = ({ label, type = "button", onClick, className, disabled }: CustomButtonProps) => {
    return (
        <button 
            type={type} 
            onClick={onClick}
            className={`CusButton btn-btn gothic-a1-bold ${className || ''}`}
            disabled={disabled}
        >
            {label}
        </button>
    );
};

export default CustomButton;
