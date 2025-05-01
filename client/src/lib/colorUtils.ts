import { colord, extend, type HslaColor } from "colord";
import harmoniesPlugin from "colord/plugins/harmonies";
import namesPlugin from "colord/plugins/names";

// Extend colord with plugins
extend([harmoniesPlugin, namesPlugin]);

export type PaletteType = 
  | "analogous" 
  | "triadic" 
  | "complementary" 
  | "split-complementary";

export type ColorHex = string;

// Generate a palette based on a base color and palette type
export function generatePalette(
  colors: ColorHex[],
  type: PaletteType,
  count: number = 5
): ColorHex[] {
  if (colors.length === 0) return [];

  const mainColor = colord(colors[0]);

  switch (type) {
    case "analogous":
      return generateAnalogousPalette(mainColor, count);
    case "triadic":
      return generateTriadicPalette(mainColor, count);
    case "complementary":
      return generateComplementaryPalette(mainColor, count);
    case "split-complementary":
      return generateSplitComplementaryPalette(mainColor, count);
    default:
      return generateAnalogousPalette(mainColor, count);
  }
}

// Generate monochromatic palette based on a single color
function generateMonochromaticPalette(color: ReturnType<typeof colord>, count: number): ColorHex[] {
  const hsla = color.toHsl();
  const step = 1 / (count - 1);
  
  return Array.from({ length: count }, (_, i) => {
    const lightness = Math.max(0.1, Math.min(0.9, 0.9 - i * step));
    return colord({ h: hsla.h, s: hsla.s, l: lightness, a: 1 }).toHex();
  });
}

// Generate analogous palette (colors adjacent on color wheel)
function generateAnalogousPalette(color: ReturnType<typeof colord>, count: number): ColorHex[] {
  const analogous = color.harmonies("analogous");
  
  if (count <= analogous.length) {
    return analogous.slice(0, count).map(c => c.toHex());
  }
  
  // If we need more colors than the basic analogous gives us
  const baseColors = analogous.map(c => c.toHex());
  const moreColors = generateMoreColors(analogous, count - analogous.length);
  
  return [...baseColors, ...moreColors];
}

// Generate triadic palette (colors evenly spaced on color wheel)
function generateTriadicPalette(color: ReturnType<typeof colord>, count: number): ColorHex[] {
  const triadic = color.harmonies("triadic");
  
  if (count <= triadic.length) {
    return triadic.slice(0, count).map(c => c.toHex());
  }
  
  // If we need more colors than the basic triadic gives us
  const baseColors = triadic.map(c => c.toHex());
  const moreColors = generateMoreColors(triadic, count - triadic.length);
  
  return [...baseColors, ...moreColors];
}

// Generate complementary palette (opposite colors on wheel)
function generateComplementaryPalette(color: ReturnType<typeof colord>, count: number): ColorHex[] {
  const complementary = color.harmonies("complementary");
  
  if (count <= 2) {
    return complementary.slice(0, count).map(c => c.toHex());
  }
  
  // For complementary we need to generate variations to reach the desired count
  const hsla = color.toHsl();
  const complementHsla = complementary[1].toHsl();
  
  const result: ColorHex[] = [
    color.toHex(),
    complementary[1].toHex()
  ];
  
  // Generate additional colors between the two complementary colors
  for (let i = 1; i < count - 1; i++) {
    const ratio = i / (count - 1);
    const h = interpolateHue(hsla.h, complementHsla.h, ratio);
    const s = interpolateValue(hsla.s, complementHsla.s, ratio);
    const l = interpolateValue(hsla.l, complementHsla.l, ratio);
    
    result.push(colord({ h, s, l, a: 1 }).toHex());
  }
  
  return result;
}

// Generate split-complementary palette
function generateSplitComplementaryPalette(color: ReturnType<typeof colord>, count: number): ColorHex[] {
  // Get the hue from the main color
  const mainHsl = color.toHsl();
  const mainHue = mainHsl.h;
  
  // Create base split complementary colors manually (30 degrees from complement)
  const color1 = colord({ h: mainHue, s: mainHsl.s, l: mainHsl.l, a: 1 });
  const color2 = colord({ h: (mainHue + 150) % 360, s: mainHsl.s, l: mainHsl.l, a: 1 });
  const color3 = colord({ h: (mainHue + 210) % 360, s: mainHsl.s, l: mainHsl.l, a: 1 });
  
  const baseSplitCompColors = [color1, color2, color3];
  
  if (count <= 3) {
    return baseSplitCompColors.slice(0, count).map(c => c.toHex());
  }
  
  // Generate variations to reach the desired count
  const result: ColorHex[] = baseSplitCompColors.map(c => c.toHex());
  
  // Fill in additional colors between the split complementary colors
  if (count > 3) {
    const additionalColors = generateMoreColors(baseSplitCompColors, count - 3);
    result.push(...additionalColors);
  }
  
  return result;
}

// Helper function to generate additional colors for a palette
function generateMoreColors(baseColors: ReturnType<typeof colord>[], count: number): ColorHex[] {
  const result: ColorHex[] = [];
  
  for (let i = 0; i < count; i++) {
    const idx1 = i % baseColors.length;
    const idx2 = (i + 1) % baseColors.length;
    
    const color1 = baseColors[idx1].toHsl();
    const color2 = baseColors[idx2].toHsl();
    
    const ratio = 0.5;
    const h = interpolateHue(color1.h, color2.h, ratio);
    const s = interpolateValue(color1.s, color2.s, ratio);
    const l = interpolateValue(color1.l, color2.l, ratio);
    
    result.push(colord({ h, s, l, a: 1 }).toHex());
  }
  
  return result;
}

// Helper function to interpolate hue values (handles wrapping around 360)
function interpolateHue(h1: number, h2: number, t: number): number {
  // Ensure the shortest path around the color wheel
  const diff = h2 - h1;
  const diff2 = diff > 180 ? diff - 360 : diff < -180 ? diff + 360 : diff;
  
  return (h1 + diff2 * t + 360) % 360;
}

// Helper function to interpolate values like saturation and lightness
function interpolateValue(v1: number, v2: number, t: number): number {
  return v1 + (v2 - v1) * t;
}

// Generate alternative palettes using different methods
export function generateAlternativePalettes(baseColors: ColorHex[]): {
  type: PaletteType;
  name: string;
  colors: ColorHex[];
}[] {
  if (baseColors.length === 0) return [];
  
  const mainColor = colord(baseColors[0]);
  
  return [
    {
      type: "analogous",
      name: `Analogous (${getColorName(mainColor)})`,
      colors: generateAnalogousPalette(mainColor, 5)
    },
    {
      type: "complementary",
      name: `Complementary (${getColorName(mainColor)})`,
      colors: generateComplementaryPalette(mainColor, 5)
    }
  ];
}

// Helper function to get a human-readable color name
function getColorName(color: ReturnType<typeof colord>): string {
  const closestNamedColor = color.toName({ closest: true });
  return closestNamedColor ? capitalizeFirstLetter(closestNamedColor) : "Color";
}

function capitalizeFirstLetter(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// Helper function to determine if text should be light or dark based on background
export function getReadableTextColor(backgroundColor: string): "black" | "white" {
  const color = colord(backgroundColor);
  return color.brightness() > 0.5 ? "black" : "white";
}

// Generate a random color
export function getRandomColor(): string {
  return colord({
    h: Math.floor(Math.random() * 360),
    s: 0.7 + Math.random() * 0.3, // Higher saturation for vibrant colors
    l: 0.4 + Math.random() * 0.2, // Medium lightness for visibility
    a: 1
  }).toHex();
}
