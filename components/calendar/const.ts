const getFebDays = (year: number) => {
  if (year % 400 === 0) return 29;
  if (year % 100 === 0) return 28;
  if (year % 4 === 0) return 29
  return 28;
}

export const getDayOfTheWeek = (year: number, month: string, day = 1) => {
  const date = new Date(`${year}-${month + 1}-${day}`);
  return date.getDay();
}
export const MONTH_DAYS = [
  {
    label: 'January',
    value: 'january',
    days: (year = (new Date).getFullYear()) => 31,
    monthNumber: '00',
  },
  {
    label: 'February',
    value: 'february',
    days: (year = (new Date).getFullYear()) => getFebDays(year),
    monthNumber: '01',
  },
  {
    label: 'March',
    value: 'march',
    days: (year = (new Date).getFullYear()) => 31,
    monthNumber: '02',
  },
  {
    label: 'April',
    value: 'april',
    days: (year = (new Date).getFullYear()) => 30,
    monthNumber: '03',
  },
  {
    label: 'May',
    value: 'may',
    days: (year = (new Date).getFullYear()) => 31,
    monthNumber: '04',
  },
  {
    label: 'June',
    value: 'june',
    days: (year = (new Date).getFullYear()) => 30,
    monthNumber: '05',
  },
  {
    label: 'July',
    value: 'july',
    days: (year = (new Date).getFullYear()) => 31,
    monthNumber: '06',
  },
  {
    label: 'August',
    value: 'august',
    days: (year = (new Date).getFullYear()) => 31,
    monthNumber: '07',
  },
  {
    label: 'September',
    value: 'september',
    days: (year = (new Date).getFullYear()) => 30,
    monthNumber: '08',
  },
  {
    label: 'October',
    value: 'october',
    days: (year = (new Date).getFullYear()) => 31,
    monthNumber: '09',
  },
  {
    label: 'November',
    value: 'november',
    days: (year = (new Date).getFullYear()) => 30,
    monthNumber: '10',
  },
  {
    label: 'December',
    value: 'december',
    days: (year = (new Date).getFullYear()) => 31,
    monthNumber: '11',
  },
]