export function getStandardTime (time: string | undefined, type: string) {
  if (time === undefined) {
    return '';
  }
  const date = time.substring(0, 10);
  if (type === 'date') {
    return date;
  } else if (type === 'dateTime') {
    return date + ' ' + time.substring(11, 19);
  }
}
