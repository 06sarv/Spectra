import { useState, useEffect } from 'react';
import { ColorHex, PaletteType, generatePalette, getRandomColor } from '@/lib/colorUtils';

export type PaletteCount = 5 | 7 | 9;

export function usePaletteGenerator() {
  // Start with vibrant default colors that look good together
  const [baseColors, setBaseColors] = useState<ColorHex[]>(['#6A36E5', '#FF3D78']);
  const [palette, setPalette] = useState<ColorHex[]>([]);
  const [paletteType, setPaletteType] = useState<PaletteType>('analogous');
  const [colorCount, setColorCount] = useState<PaletteCount>(5);

  // Generate initial palette
  useEffect(() => {
    if (baseColors.length > 0) {
      const newPalette = generatePalette(baseColors, paletteType, colorCount);
      setPalette(newPalette);
    }
  }, []);

  // Update a base color
  const updateBaseColor = (index: number, color: ColorHex) => {
    const newBaseColors = [...baseColors];
    newBaseColors[index] = color;
    setBaseColors(newBaseColors);
  };

  // Add a new base color (max 3) with a bright random color
  const addBaseColor = () => {
    if (baseColors.length < 3) {
      const randomColor = getRandomColor();
      setBaseColors([...baseColors, randomColor]);
    }
  };

  // Remove a base color
  const removeBaseColor = (index: number) => {
    if (baseColors.length > 1) {
      const newBaseColors = baseColors.filter((_, i) => i !== index);
      setBaseColors(newBaseColors);
    }
  };

  // Generate a new palette with current settings
  const generateNewPalette = () => {
    const newPalette = generatePalette(baseColors, paletteType, colorCount);
    setPalette(newPalette);
  };

  return {
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
  };
}
