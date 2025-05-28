import { useNavigate } from "react-router-dom";


    const Backbutton = () => {
        const navigate = useNavigate();

        const handleBackClick = () => {
            navigate('/dashboard');
    };

  return (
    <button
      onClick={handleBackClick}
      style={{
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        border: '2px solid #d9d9d9',
        backgroundColor: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
        cursor: 'pointer',
        padding: 0,
      }}
    >
      <i className="bi bi-arrow-left" style={{ fontSize: "20px", color: "#000" }}></i>
    </button>
  );
};

export default Backbutton;
