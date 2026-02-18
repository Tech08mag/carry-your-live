import React, { useState } from 'react';

interface ColorNavbarProps {
  selectedColor: string;
  onSelectColor: (color: string) => void;
  customColors: string[];
  onAddColorGroup: (color: string) => void;
  onRemoveColorGroup: (color: string) => void;
}

const ColorFilterBar: React.FC<ColorNavbarProps> = ({
  selectedColor,
  onSelectColor,
  customColors,
  onAddColorGroup,
  onRemoveColorGroup,
}) => {
  const [newColor, setNewColor] = useState('');

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

      {/* Add new color */}
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={newColor}
          onChange={(e) => setNewColor(e.target.value)}
          placeholder="Add Color"
          className="px-3 py-1 rounded-lg bg-[#3a1b4d] text-[#e0c7ff] border border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
        <button
          onClick={() => {
            if (newColor.trim()) {
              onAddColorGroup(newColor.trim());
              setNewColor('');
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

export default ColorFilterBar;
