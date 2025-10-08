import React from "react";

interface ClearButtonProps {
  onClick: () => void;
  disabled: boolean;
  count: number;
}

const ClearButton: React.FC<ClearButtonProps> = ({ onClick, disabled, count }) => {
  return (
    <button onClick={onClick} disabled={disabled} className="clear-ingredients-btn">
      Clear List ({count})
    </button>
  );
};

export default ClearButton;
