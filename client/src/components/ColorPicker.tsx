import { useState, useRef } from 'react';
import { ColorHex } from '@/lib/colorUtils';
import { X } from 'lucide-react';

interface ColorPickerProps {
  color: ColorHex;
  index: number;
  onChange: (index: number, color: ColorHex) => void;
  onRemove?: (index: number) => void;
  showRemove?: boolean;
}

const ColorPicker = ({ color, index, onChange, onRemove, showRemove = false }: ColorPickerProps) => {
  const [displayColor, setDisplayColor] = useState<ColorHex>(color);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setDisplayColor(newColor);
    onChange(index, newColor);
  };

  const handleRemove = () => {
    if (onRemove) {
      onRemove(index);
    }
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  return (
    <div className="color-picker-container">
      <div 
        className="color-picker-wrapper w-24 h-24 rounded-xl shadow-lg mb-3 relative group cursor-pointer"
        style={{ backgroundColor: displayColor }}
        onClick={handleClick}
      >
        <input 
          ref={inputRef}
          type="color" 
          value={displayColor} 
          onChange={handleChange}
          aria-label={`Choose color ${index + 1}`}
          className="sr-only"
        />
        
        <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 bg-black/30 flex items-center justify-center transition-opacity">
          <span className="text-white text-xs font-medium flex items-center justify-center h-full w-full">Click to change</span>
        </div>
        
        {showRemove && (
          <button 
            onClick={(e) => {
              e.stopPropagation();
              handleRemove();
            }}
            className="absolute -top-2 -right-2 bg-gray-800 rounded-full w-7 h-7 flex items-center justify-center hover:bg-red-600 transition-colors shadow-md z-10"
            aria-label="Remove color"
          >
            <X className="text-white w-4 h-4" />
          </button>
        )}
      </div>
      <div className="text-center">
        <span className="text-sm font-medium text-gray-300 tracking-wider">{displayColor}</span>
      </div>
    </div>
  );
};

export default ColorPicker;
