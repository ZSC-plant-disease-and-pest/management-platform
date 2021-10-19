
// 判断时间是否小于 10，小于则加 0
function addZero (number: number) {
  return number < 10 ? '0' + number : number;
}

/**
 *
 * @param time
 * @param type = 'date' | 'datetime'
 * @returns 规定格式的时间
 */
export function getStandardTime (time: Date, type: string) {
  const y = time.getFullYear();
  const m = time.getMonth() + 1;
  const d = time.getDate();
  const h = time.getHours();
  const mm = time.getMinutes();
  const s = time.getSeconds();
  const date = y + '-' + addZero(m) + '-' + addZero(d);
  if (type === 'date') {
    return date;
  } else if (type === 'datetime') {
    return date + ' ' + addZero(h) + ':' + addZero(mm) + ':' + addZero(s);
  }
}
