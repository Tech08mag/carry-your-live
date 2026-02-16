import React from 'react';

interface ColorNavbarProps {
  selectedColor: string;
  onSelectColor: (color: string) => void;
}

const ColorNavbar: React.FC<ColorNavbarProps> = ({ selectedColor, onSelectColor }) => {
  const colors = ['red', 'blue', 'green', 'yellow', 'purpleLight', 'purpleDark', 'purpleGradient', 'dark'];

  return (
    <div className="flex justify-center space-x-4 mb-6">
      {colors.map((color) => (
        <button
          key={color}
          onClick={() => onSelectColor(color)}
          className={`w-6 h-6 rounded-full ${selectedColor === color ? 'border-4 border-white' : ''}`}
          style={{
            backgroundColor: color === 'red' ? '#f44336' : 
              color === 'blue' ? '#2196f3' :
              color === 'green' ? '#4caf50' :
              color === 'yellow' ? '#ffeb3b' :
              color === 'purpleLight' ? '#9c27b0' :
              color === 'purpleDark' ? '#673ab7' :
              color === 'purpleGradient' ? 'linear-gradient(45deg, #673ab7, #9c27b0)' :
              color === 'dark' ? '#1a1a1a' : '#fff',
          }}
        />
      ))}
    </div>
  );
};

export default ColorNavbar;
