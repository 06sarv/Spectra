import { useState } from 'react';
import ColorPicker from '@/components/ColorPicker';
import ColorSwatch from '@/components/ColorSwatch';
import PaletteControls from '@/components/PaletteControls';
import { usePaletteGenerator } from '@/hooks/usePaletteGenerator';
import { Button } from '@/components/ui/button';
import { PlusIcon, PaletteIcon, Sparkles } from 'lucide-react';

const PaletteGenerator = () => {
  const {
    baseColors,
    palette,
    paletteType,
    colorCount,
    updateBaseColor,
    addBaseColor,
    removeBaseColor,
    setPaletteType,
    setColorCount,
    generateNewPalette
  } = usePaletteGenerator();

  const canAddColor = baseColors.length < 3;

  return (
    <div className="min-h-screen px-4 py-8 md:py-16 bg-gradient-to-b from-[hsl(var(--app-dark))] to-black">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -left-20 top-1/4 w-64 h-64 bg-[hsl(var(--app-accent))] rounded-full filter blur-3xl opacity-10 animate-float"></div>
        <div className="absolute -right-20 top-2/3 w-80 h-80 bg-[hsl(var(--app-accent-alt))] rounded-full filter blur-3xl opacity-10 animate-float" style={{ animationDelay: '2s' }}></div>
      </div>
      
      <div className="container mx-auto relative z-10">
        <header className="mb-12 text-center">
          <div className="flex items-center justify-center mb-4">
            <PaletteIcon className="w-8 h-8 mr-2 text-[hsl(var(--app-accent))]" />
            <h1 className="text-5xl md:text-6xl font-black font-heading gradient-text">
              Spectra
            </h1>
          </div>
          <p className="text-gray-400 text-lg mb-2">Color Palette Generator</p>
          <div className="w-24 h-1 bg-gradient-to-r from-[hsl(var(--app-gradient-start))] to-[hsl(var(--app-gradient-end))] mx-auto rounded-full"></div>
        </header>

        {/* Color Picker Section */}
        <div className="glass-card p-8 mb-10 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <Sparkles className="w-5 h-5 mr-2 text-[hsl(var(--app-accent-alt))]" />
            Choose Base Colors
          </h2>
          <p className="text-gray-400 mb-8">Select up to 3 colors to generate a harmonious palette</p>
          
          <div className="flex flex-wrap justify-center gap-8 mb-8">
            {baseColors.map((color, index) => (
              <ColorPicker
                key={index}
                color={color}
                index={index}
                onChange={updateBaseColor}
                onRemove={baseColors.length > 1 ? removeBaseColor : undefined}
                showRemove={baseColors.length > 1}
              />
            ))}
            
            {/* Add Color button */}
            {canAddColor && (
              <div className="color-picker-container">
                <Button
                  variant="outline"
                  className="color-picker-wrapper w-24 h-24 rounded-xl mb-2 glass-button flex items-center justify-center group shadow-lg hover:shadow-glow transition-all duration-300"
                  onClick={addBaseColor}
                >
                  <PlusIcon className="text-white h-8 w-8 group-hover:scale-110 transition-transform" />
                </Button>
                <div className="text-center">
                  <span className="text-sm font-medium text-gray-300">Add Color</span>
                </div>
              </div>
            )}
          </div>
          
          {/* Palette Controls */}
          <PaletteControls
            paletteType={paletteType}
            colorCount={colorCount}
            onPaletteTypeChange={setPaletteType}
            onColorCountChange={setColorCount}
            onGenerate={generateNewPalette}
          />
        </div>

        {/* Palette Display */}
        <div className="glass-card p-8 mb-10 max-w-4xl mx-auto">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-2">Your Color Palette</h2>
            <p className="text-gray-400">Click on any color to copy its hex code</p>
          </div>
          
          {/* Color Swatches Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5 mb-4">
            {palette.map((color, index) => (
              <ColorSwatch key={index} color={color} />
            ))}
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center text-gray-500 text-sm mt-16">
          <p className="mb-1">
            Spectra — A beautifully simple color palette generator
          </p>
        </footer>
      </div>
    </div>
  );
};

export default PaletteGenerator;
