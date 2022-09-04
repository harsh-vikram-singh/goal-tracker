import { Fragment, useState } from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/solid";
import { Menu, Transition } from "@headlessui/react";
import NarrowContainer from "components/layouts/NarrowContainer";
import { MONTH_DAYS, getDayOfTheWeek } from "./const";

const testDate = {
  currentMonth: 0,
  currentYear: 2022,
}
const filterData = () => {};

interface SingleDateInfo {
  date: string;
  dayOfTheWeek: number;
  isCurrentMonth?: boolean;
  isSelected?: boolean;
  progressState?: "success" | "failure";
  message?: Array<string>;
}

interface UpdateProgressCalendarProps {
  goalStartDate?: Date;
  goalEndDate?: Date;
  dates: Array<SingleDateInfo>;
  setSelectedDate: (date: string) => void;
  setModalOpen: (isOpen: boolean) => void;
  isModalOpen: boolean;
}

const UpdateProgressCalendar = ({
  dates,
  goalStartDate,
  goalEndDate,
  setModalOpen,
  setSelectedDate,
  isModalOpen
}: UpdateProgressCalendarProps) => {
  
  const getStartMonthAndYear = () => {
    const today = new Date();
    let currentMonth, currentYear;
    // debugger;
    if (goalStartDate && goalEndDate) {
      if (today >= goalStartDate && today <= goalEndDate) {
        currentMonth = today.getMonth();
        currentYear = today.getFullYear();
      }
      if (today < goalStartDate || today > goalEndDate) {
        currentMonth = goalStartDate.getMonth();
        currentYear = goalStartDate.getFullYear();
      }
    } else {
      currentMonth = today.getMonth();
      currentYear = today.getFullYear();
    }
    return {
      month: currentMonth,
      year: currentYear
    }
  };

  const [currentMonthYear, setCurrentMonthYear] = useState<{month: number | undefined; year: number | undefined}>(() => getStartMonthAndYear());

  const goOneMonthBack= () => {
    const {month, year} = currentMonthYear;
    if (!month || !year) return null;
    if (month === 0) {
      setCurrentMonthYear({
        month: 11,
        year: (year - 1),
      });
      return {
        month: 11,
        year: (year - 1)
      }
    }
    setCurrentMonthYear({
      month: (month - 1),
      year
    });
    return {
      month: (month - 1),
      year
    }
  };

  const isEarliestMonthYear = (): boolean => {
    const { month, year } = currentMonthYear;
    const startMonth = goalStartDate?.getMonth();
    const startYear = goalStartDate?.getFullYear();
    if (`${month}${year}` === `${startMonth}${startYear}`) return true;
    return false;
  };

  const isLastMonthYear = (): boolean => {
    const { month, year } = currentMonthYear;
    const endMonth = goalEndDate?.getMonth();
    const endYear = goalEndDate?.getFullYear();
    if (`${month}${year}` === `${endMonth}${endYear}`) return true;
    return false;
  }

  const goOneMonthForward = () => {
    const {month, year} = currentMonthYear;
    if (!month || !year) return null;
    if (month === 11) {
      const nextVal = {
        month: 0,
        year: (year + 1)
      }
      setCurrentMonthYear(nextVal);
      return nextVal;
    }
    const nextVal = {
      month: (month + 1),
      year
    }
    setCurrentMonthYear(nextVal);
    return (nextVal);
  }

  let currentMonthDates: any;
  if(currentMonthYear && currentMonthYear?.month) {
    currentMonthDates = dates.filter(dateVal => parseInt(dateVal.date.split('-')[1]) === currentMonthYear?.month as number + 1);
  }

  // const getColPosition = (dayOfTheWeek: number) => {
  //   return `col-start-${dayOfTheWeek + 1}`;
  // }

  const getColPosition = (dayOfTheWeek: number) => {
    if (dayOfTheWeek === 0) return 'col-start-1';
    if (dayOfTheWeek === 1) return 'col-start-2';
    if (dayOfTheWeek === 2) return 'col-start-3';
    if (dayOfTheWeek === 3) return 'col-start-4';
    if (dayOfTheWeek === 4) return 'col-start-5';
    if (dayOfTheWeek === 5) return 'col-start-6';
    if (dayOfTheWeek === 6) return 'col-start-7';
    if (dayOfTheWeek === 7) return 'col-start-8';
  }

  const getStatusLook = (status: string | undefined) => {
    debugger;
    if (status === undefined) return 'bg-slate-50';
    if (status === 'success') {
      return 'bg-green-300 text-green-700'
    }
    if (status === 'failure') {
      return 'bg-red-300 text-red-800';
    }
    return;
  }

  const getCalendarDates = () => {
    return (
      currentMonthDates?.map((dateVal: any) => {
        return (
          <div
            key={dateVal.date}
            data-date={dateVal.date}
            className={`${getStatusLook(dateVal.progressState)} ${getColPosition(dateVal.dayOfTheWeek)} col-span-1 px-2 py-2 hover:shadow-md hover:bg-white hover:cursor-pointer`}
            onClick={(e) => {
              console.log('isModalOpen: ', isModalOpen, ', setting it to: ', !isModalOpen);
              setModalOpen(!isModalOpen)
              setSelectedDate(dateVal.date)
            }}
          >
            <div className='relative w-30 h-20'>
            <time className='absolute top-0 left-0 p-2' dateTime={dateVal.date}>
              {dateVal.date.split("-")[2].replace(/^0/, "")}
            </time>
            {
              dateVal.progressState === 'success' ? (
                <CheckCircleIcon className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8'/> 
              ) : (
                dateVal.progressState === 'failure' ? (
                  <XCircleIcon className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8'/>
                ) : null
              )
            }
            </div>
          </div>
        );
      })
    )
  }

  return (
    <NarrowContainer>
      <div className="flex items-center gap-4">
        <p className={`border rounded p-2 ${isEarliestMonthYear() ? 'invisible' : null}`} onClick={goOneMonthBack}>{<ChevronLeftIcon className='h-6 w-6'/>}</p>
        <p className="w-30">{MONTH_DAYS[currentMonthYear?.month as number].label}, {currentMonthYear.year }</p>
        <p className={`border rounded p-2 ${isLastMonthYear() ? 'invisible': null}`} onClick={goOneMonthForward}>{<ChevronRightIcon className='h-6 w-6'/>}</p>
      </div>
      <div className="p-1 py-4 mt-4 rounded grid grid-cols-7 gap-1 border-b border-gray-300 bg-gray-200 text-center text-xs font-semibold leading-6 text-gray-700 lg:flex-none">
        <div className="bg-white py-2">
          S<span className="sr-only sm:not-sr-only">un</span>
        </div>
        <div className="bg-white py-2">
          M<span className="sr-only sm:not-sr-only">on</span>
        </div>
        <div className="bg-white py-2">
          T<span className="sr-only sm:not-sr-only">ue</span>
        </div>
        <div className="bg-white py-2">
          W<span className="sr-only sm:not-sr-only">ed</span>
        </div>
        <div className="bg-white py-2">
          T<span className="sr-only sm:not-sr-only">hu</span>
        </div>
        <div className="bg-white py-2">
          F<span className="sr-only sm:not-sr-only">ri</span>
        </div>
        <div className="bg-white py-2">
          S<span className="sr-only sm:not-sr-only">at</span>
        </div>
        {getCalendarDates()}
      </div>
    </NarrowContainer>
  );
};

export default UpdateProgressCalendar;
