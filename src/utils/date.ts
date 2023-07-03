export function timeStampToDate(timeStamp: number, withHour = false) {
  const date = new Date(timeStamp * 1000);
  const hour = date.getHours();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return withHour
    ? `${hour}h ${day}/${month}/${year}`
    : `${day}/${month}/${year}`;
}
