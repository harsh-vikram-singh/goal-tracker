export interface ProgressDate {
  date: string; // should be in the format: yyyy-mm-dd
  isCurrentMonth?: boolean;
  events?: Array<string>;
  isSelected?: boolean;
}

export interface SingleDateInfo {
  date: string; // should be in the format: yyyy-mm-dd
  dayOfTheWeek: number;
  isCurrentMonth?: boolean;
  isSelected?: boolean
  progressState?: 'success' | 'failure';
  message?: Array<string>;
}

export interface StartEndDate {
  day: number;
  month: number;
  year: number
}

const generateDates = (startDate: Date, endDate: Date) => {
  const dates: Array<SingleDateInfo> = [];
  const currentDate = new Date();
  for (let tempDate = new Date(startDate.getTime()); tempDate <= endDate; tempDate.setDate(tempDate.getDate() + 1)) {
    dates.push({
      date: tempDate.toISOString().split('T')[0],
      isCurrentMonth: currentDate.getMonth() === tempDate.getMonth(),
      dayOfTheWeek: tempDate.getDay(),
    });
  };
  return dates;
};

export {
  generateDates
}