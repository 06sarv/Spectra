import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { PaletteType } from '@/lib/colorUtils';
import { PaletteCount } from '@/hooks/usePaletteGenerator';
import { RefreshCw, Palette, Layers } from 'lucide-react';

interface PaletteControlsProps {
  paletteType: PaletteType;
  colorCount: PaletteCount;
  onPaletteTypeChange: (type: PaletteType) => void;
  onColorCountChange: (count: PaletteCount) => void;
  onGenerate: () => void;
}

const PaletteControls = ({
  paletteType,
  colorCount,
  onPaletteTypeChange,
  onColorCountChange,
  onGenerate
}: PaletteControlsProps) => {
  const handlePaletteTypeChange = (value: string) => {
    onPaletteTypeChange(value as PaletteType);
  };

  const handleColorCountChange = (value: string) => {
    onColorCountChange(Number(value) as PaletteCount);
  };

  // Function to get a human-friendly name for palette types
  const getPaletteTypeName = (type: PaletteType): string => {
    switch(type) {
      case 'analogous': return 'Analogous';
      case 'triadic': return 'Triadic';
      case 'complementary': return 'Complementary';
      case 'split-complementary': return 'Split Complementary';
      default: return type;
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 items-center justify-center md:justify-between">
      <div className="flex flex-col sm:flex-row items-center gap-5">
        <div className="flex flex-col gap-2 w-full sm:w-auto">
          <label className="text-sm text-gray-400 font-medium flex items-center">
            <Palette className="h-3.5 w-3.5 mr-1.5 text-[hsl(var(--app-accent))]" />
            Palette Type
          </label>
          <Select value={paletteType} onValueChange={handlePaletteTypeChange}>
            <SelectTrigger className="bg-white text-black w-full sm:w-auto min-w-[180px] rounded-xl">
              <SelectValue>
                {getPaletteTypeName(paletteType)}
              </SelectValue>
            </SelectTrigger>
            <SelectContent className="bg-white text-black rounded-lg">
              <SelectGroup>
                <SelectItem value="analogous">Analogous</SelectItem>
                <SelectItem value="triadic">Triadic</SelectItem>
                <SelectItem value="complementary">Complementary</SelectItem>
                <SelectItem value="split-complementary">Split Complementary</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex flex-col gap-2 w-full sm:w-auto">
          <label className="text-sm text-gray-400 font-medium flex items-center">
            <Layers className="h-3.5 w-3.5 mr-1.5 text-[hsl(var(--app-accent-alt))]" />
            Number of Colors
          </label>
          <Select value={colorCount.toString()} onValueChange={handleColorCountChange}>
            <SelectTrigger className="bg-white text-black w-full sm:w-auto min-w-[120px] rounded-xl">
              <SelectValue>{colorCount} Colors</SelectValue>
            </SelectTrigger>
            <SelectContent className="bg-white text-black rounded-lg">
              <SelectGroup>
                <SelectItem value="5">5 Colors</SelectItem>
                <SelectItem value="7">7 Colors</SelectItem>
                <SelectItem value="9">9 Colors</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <Button 
        className="bg-gradient-to-r from-[hsl(var(--app-gradient-start))] to-[hsl(var(--app-gradient-end))] hover:opacity-90 text-white font-medium py-3 px-8 rounded-xl shadow-lg hover:shadow-glow transition-all duration-300 w-full sm:w-auto"
        onClick={onGenerate}
      >
        <RefreshCw className="h-4 w-4 mr-2" />
        Generate Palette
      </Button>
    </div>
  );
};

export default PaletteControls;
