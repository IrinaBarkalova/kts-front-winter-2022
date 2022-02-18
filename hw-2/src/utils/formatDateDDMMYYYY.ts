export const formatDateDDMMYYYY = (date: Date): string => {
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  if (day < 10 && month < 10)
    return `${"Updated "}${"0" + day}.${"0" + month}.${year}`;
  if (day < 10 && month >= 10)
    return `${"Updated "}${"0" + day}.${month}.${year}`;
  if (day >= 10 && month < 10)
    return `${"Updated "}${day}.${"0" + month}.${year}`;

  return `${"Updated "}${day}.${month}.${year}`;
};
