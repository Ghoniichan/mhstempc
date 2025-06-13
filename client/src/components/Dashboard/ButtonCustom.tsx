import 'bootstrap-icons/font/bootstrap-icons.css';
import { useState } from 'react';

type DropdownItem = {
  label: string;
  onClick: () => void;
};

type ButtonCustomProps = {
  text?: string;
  icon?: string;
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
  iconSize?: string;
  fontSize?: string;
  fontWeight?: string | number;
  minWidth?: string;
  height?: string;
  borderRadius?: string;
  onClick?: () => void;
  customStyle?: React.CSSProperties;
  isDropdown?: boolean;
  dropdownItems?: DropdownItem[];
};

const ButtonCustom: React.FC<ButtonCustomProps> = ({
  text = '',
  icon = '',
  backgroundColor = '#ffffff',
  textColor = '#333',
  borderColor = '#d9d9d9',
  iconSize = '22px',
  fontSize = '16px',
  fontWeight = '700',
  minWidth = '120px',
  height = '41px',
  borderRadius = '10px',
  onClick = () => {},
  customStyle = {},
  isDropdown = false,
  dropdownItems = [],
}) => {
  const [open, setOpen] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState(text);

  const toggleDropdown = () => setOpen(prev => !prev);

  const handleItemClick = (label: string, itemClick: () => void) => {
    setSelectedLabel(label);
    itemClick();
    setOpen(false);
  };

  const handleClick = () => {
    if (isDropdown) {
      toggleDropdown();
    } else {
      onClick();
    }
  };

  return (
    <div className="position-relative d-flex justify-content-center align-items-center">
      <button
        className="btn d-flex align-items-center gap-3 px-4 py-3 shadow-sm gothic-a1-bold"
        style={{
          backgroundColor,
          color: textColor,
          borderColor,
          borderWidth: '2px',
          fontSize,
          fontWeight,
          minWidth,
          height,
          borderRadius,
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          transition: 'all 0.2s ease',
          ...customStyle,
        }}
        onClick={handleClick}
      >
        {icon && (
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
        )}
        {selectedLabel}
        {isDropdown && <i className="bi bi-caret-down-fill ms-1" />}
      </button>

      {isDropdown && open && (
        <div
          className="position-absolute bg-white border rounded shadow-sm mt-2"
          style={{ top: '100%', zIndex: 10, minWidth }}
        >
          {dropdownItems.map((item, index) => (
            <div
              key={index}
              className="dropdown-item px-3 py-2"
              style={{
                cursor: 'pointer',
                backgroundColor: item.label === selectedLabel ? '#d9d9d9' : 'white',
                fontWeight: item.label === selectedLabel ? '600' : 'normal',
              }}
              onClick={() => handleItemClick(item.label, item.onClick)}
            >
              {item.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ButtonCustom;
