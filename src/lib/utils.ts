// Tiny helpers used across controls and editor cards.

export const cn = (...classes: Array<string | false | null | undefined>): string =>
  classes.filter(Boolean).join(' ');

export const hexToRgba = (hex: string, alpha: number): string => {
  const clean = hex.replace('#', '');
  const isShort = clean.length === 3;
  const r = parseInt(isShort ? clean[0] + clean[0] : clean.slice(0, 2), 16);
  const g = parseInt(isShort ? clean[1] + clean[1] : clean.slice(2, 4), 16);
  const b = parseInt(isShort ? clean[2] + clean[2] : clean.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export const fontFamilyToCss = (family: string): string => {
  switch (family) {
    case 'Inter':
      return '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
    case 'Roboto':
      return '"Roboto", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
    case 'Plus Jakarta':
      return '"Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
    case 'System':
    default:
      return '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  }
};