// Add zero in front of numbers < 10
export function zeroPad(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

export function numberToDay(number) {
  const days = {
    0: 'SUN',
    1: 'MON',
    2: 'TUE',
    3: 'WED',
    4: 'THU',
    5: 'FRI',
    6: 'SAT'
  };
  
  return days[number];
}

export function numberToMonth(number) {
  const months = {
    0: 'JAN',
    1: 'FEB',
    2: 'MAR',
    3: 'APR',
    4: 'MAY',
    5: 'JUN',
    6: 'JUL',
    7: 'AUG',
    8: 'SEP',
    9: 'OCT',
    10: 'NOV',
    11: 'DEC'
  }
  
  return months[number];
}

export function getNextFormat(format) {
  if (format === 'current') return 'percentage';
  if (format === 'percentage') return 'additional';
  if (format === 'additional') return 'current';
  return format;
}
