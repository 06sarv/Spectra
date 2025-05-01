import { ColorHex, PaletteType } from '@/lib/colorUtils';

interface AlternativePaletteProps {
  name: string;
  colors: ColorHex[];
  type: PaletteType;
  onApply: (palette: { type: PaletteType; colors: ColorHex[] }) => void;
}

const AlternativePalette = ({ name, colors, type, onApply }: AlternativePaletteProps) => {
  const handleApply = () => {
    onApply({ type, colors });
  };

  return (
    <div className="bg-[hsl(var(--app-dark))] rounded-lg p-4 hover:bg-gray-800 transition-colors cursor-pointer">
      <div className="flex mb-2">
        {colors.map((color, index) => (
          <div key={index} className="h-10 flex-1" style={{ backgroundColor: color }}></div>
        ))}
      </div>
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-gray-400">{name}</span>
        <button 
          className="text-xs text-gray-400 hover:text-white transition-colors"
          onClick={handleApply}
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default AlternativePalette;
