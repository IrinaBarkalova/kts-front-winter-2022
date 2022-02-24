type customDateType = {
  d: number;
  m: number;
  y: number;
};

const getDate = (date: Date): customDateType => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return { d: day, m: month, y: year };
};

export const formatDate = (date: Date): string => {
  const { d, m, y } = getDate(date);
  if (d < 10 && m < 10) return `${"Updated "}${"0" + d}.${"0" + m}.${y}`;
  if (d < 10 && m >= 10) return `${"Updated "}${"0" + d}.${m}.${y}`;
  if (d >= 10 && m < 10) return `${"Updated "}${d}.${"0" + m}.${y}`;

  return `${"Updated "}${d}.${m}.${y}`;
};
