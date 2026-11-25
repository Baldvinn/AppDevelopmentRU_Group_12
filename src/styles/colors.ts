export const ivory = "#fffff0";
export const lightred = "#cd5c5c";
export const lightblue = "#b2e2e2";
export const mildblack = "#1A1A1A";
export const lightgrey = "#d3d3d3";
export const lightlightgrey = "#f5f5f5";
export const darkblue = "#00008b";

export function getTextColorFor(background: string): string {
  let hex = background.replace("#", "");

  // Convert short hex like "#fff" to 6 chars
  if (hex.length === 3) {
    hex = hex
      .split("")
      .map((c) => c + c)
      .join("");
  }

  if (hex.length !== 6) {
    return mildblack; // Fallback for unknown format
  }

  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  // Perceived brightness: green looks brightest, blue the darkest
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;

  return brightness >= 128 ? mildblack : "#ffffff";
}
