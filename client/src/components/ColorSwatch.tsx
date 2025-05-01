import { useState, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';
import { ColorHex, getReadableTextColor } from '@/lib/colorUtils';
import { Copy, Check } from 'lucide-react';

interface ColorSwatchProps {
  color: ColorHex;
}

const ColorSwatch = ({ color }: ColorSwatchProps) => {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<number | null>(null);
  const { toast } = useToast();
  
  const textColor = getReadableTextColor(color);

  const handleCopyClick = () => {
    navigator.clipboard.writeText(color).then(() => {
      // Clear any existing timeout
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
      
      setCopied(true);
      
      // Show toast notification
      toast({
        title: "Copied!",
        description: `${color.toUpperCase()} has been copied to clipboard`,
        duration: 2000,
      });
      
      // Reset copied state after animation
      timeoutRef.current = window.setTimeout(() => {
        setCopied(false);
      }, 1500);
    });
  };

  return (
    <div 
      className="color-swatch relative aspect-square cursor-pointer overflow-hidden shadow-xl"
      onClick={handleCopyClick}
    >
      <div className="w-full h-full" style={{ backgroundColor: color }}></div>
      
      <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-all duration-300 flex flex-col items-center justify-center backdrop-blur-[1px] opacity-0 hover:opacity-100">
        <p 
          className={`font-semibold text-lg tracking-wider ${textColor === 'black' ? 'text-black' : 'text-white'}`}
        >
          {color.toUpperCase()}
        </p>
        
        <div className="mt-3 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center">
          <Copy className={`h-3.5 w-3.5 mr-1.5 ${textColor === 'black' ? 'text-black' : 'text-white'}`} />
          <span className={`text-xs font-medium ${textColor === 'black' ? 'text-black' : 'text-white'}`}>
            Click to copy
          </span>
        </div>
      </div>
      
      {copied && (
        <div className="absolute inset-0 bg-black/75 backdrop-blur-sm flex items-center justify-center copied-animation">
          <div className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full">
            <div className="bg-green-500 rounded-full p-0.5">
              <Check className="h-3 w-3 text-white" />
            </div>
            <span className="text-white text-sm font-medium">Copied!</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ColorSwatch;
