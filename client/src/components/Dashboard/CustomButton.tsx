import '../../../src/styles/custom-bootsrap.scss';
import './CustomButton.css';

type CustomButtonProps = {
    label: string;
    type?: "button" | "submit";
    onClick?: () => void;
    disabled?: boolean;
};

const CustomButton = ({ label, type = "button", onClick }: CustomButtonProps) => {
    return (
        <button 
            type={type} 
            onClick={onClick}
            className='CusButton btn-btn gothic-a1-bold'
        >
            {label}
        </button>
    );
};

export default CustomButton;
