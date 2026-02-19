import React, { useState } from 'react';
import {ColorNavbarProps } from '../../models/ToDo'

const ColorNavbar: React.FC<ColorNavbarProps> = ({
  selectedColor,
  onSelectColor,
  customColors,
  onAddColorGroup,
  onRemoveColorGroup,
}) => {
  const [newColor, setNewColor] = useState('#6a1b9a'); // default purple

  return (
    <div className="flex flex-wrap items-center gap-3 mb-6">
      {/* Color Buttons */}
      {customColors.map((color, index) => (
        <button
          key={index}
          onClick={() => onSelectColor(color)}
          style={{ backgroundColor: color }}
          className={`
            w-8 h-8 rounded-full border-2
            ${selectedColor === color ? 'border-white' : 'border-purple-700'}
            transition-transform hover:scale-110
          `}
        />
      ))}

      {/* Add new color using color picker */}
      <div className="flex items-center gap-2">
        <input
          type="color"
          value={newColor}
          onChange={(e) => setNewColor(e.target.value)}
          className="w-10 h-10 p-0 border-2 border-purple-600 rounded-full cursor-pointer transition-transform hover:scale-110"
        />
        <button
          onClick={() => {
            if (!customColors.includes(newColor)) {
              onAddColorGroup(newColor);
            }
          }}
          className="px-3 py-1 bg-purple-600 hover:bg-purple-500 rounded-lg text-white font-semibold transition-transform hover:scale-105"
        >
          Add
        </button>
      </div>

      {/* Remove last color */}
      <button
        onClick={() =>
          onRemoveColorGroup(customColors[customColors.length - 1])
        }
        className="px-3 py-1 bg-red-600 hover:bg-red-500 rounded-lg text-white font-semibold transition-transform hover:scale-105"
      >
        Remove
      </button>
    </div>
  );
};

export default ColorNavbar;
