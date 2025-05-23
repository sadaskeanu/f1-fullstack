export const getYearsRange = (
  from: number,
  to: number = new Date().getFullYear()
) => Array.from({ length: to - from + 1 }).map((_item, index) => from + index);
