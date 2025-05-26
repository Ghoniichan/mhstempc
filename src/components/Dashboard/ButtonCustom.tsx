// ButtonCustom.jsx
import 'bootstrap-icons/font/bootstrap-icons.css';

const ButtonCustom = ({
  text = '',
  icon = '',
  backgroundColor = '#ffffff',
  textColor = '#333',
  borderColor = '#d9d9d9',
  iconSize = '22px',
  fontSize = '16px',
  fontWeight = '700',
  minWidth = '120px',
  minHeight= '22px',
  borderRadius = '10px',
  onClick = () => {},
  customStyle = {},
}) => {
  return (
    <div className="d-flex justify-content-center align-items-center">
      <button
        className="btn d-flex align-items-center gap-3 px-4 py-3 shadow gothic-a1-bold"
        style={{
          backgroundColor,
          color: textColor,
          borderColor,
          borderWidth: '2px',
          fontSize,
          fontWeight,
          minWidth,
          minHeight,
          borderRadius,
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          transition: 'all 0.2s ease',
          ...customStyle,
        }}
        onClick={onClick}
      >
        {/* Icon box */}
        <div
          className="d-flex align-items-center justify-content-center"
          style={{
            width: iconSize,
            height: iconSize,
            borderRadius: '6px',
            color: textColor,
          }}
        >
          <i className={`bi ${icon}`} style={{ fontSize: iconSize, lineHeight: 1 }}></i>
        </div>
        {text}
      </button>
    </div>
  );
};

export default ButtonCustom;
