import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import db from 'prisma/client';
import { generateDates, SingleDateInfo } from "server.utils/date";

const getDateMonthYear = (date: Date) => {
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  return ({day, month, year});
}

const updateDatesWithProgressInfo = (dates: Array<SingleDateInfo>, goalData: any) => {
  const progressData = goalData.ProgressTracker;
  let i = 0;
  let j = 0;
  while (i < progressData.length && j < dates.length) {
    const progressInfo = progressData[i];
    const dateVal = dates[j];
    const isoString = progressInfo.entryDate.toISOString().split('T')[0];
    const dateString = dateVal.date;
    if (isoString === dateString) {
      dateVal.progressState = progressInfo.Status;
      i++;
      j++;
      continue;
    }
    j++;
  }
}

const getGoalProgress = async (req: NextApiRequest, res: NextApiResponse) => {
  const {goalId} = req.query;
  if (goalId && typeof(goalId) === 'string') {
    const goalData = await db.goal.findUnique({
      where: {
        id: goalId
      },
      include: {
        ProgressTracker: {
          orderBy: {
            entryDate: 'asc'
          }
        }
      }
    });
    console.log('goal data: ', goalData);
    const startDate = goalData?.goalStartDate;
    const endDate = goalData?.goalEndDate;
    if (!startDate ||  !endDate) {
      res.json({error: 'Please add start and end dates to the goal'});
    } else {
      // const {day: startDay, month: startMonth, year: statYear} = getDateMonthYear(startDate );
      // const {day: endDay, month: endMonth, year: endYear} = getDateMonthYear(endDate);
      const dates = generateDates(startDate, endDate);
      const datesCopy = dates.slice();
      updateDatesWithProgressInfo(datesCopy, goalData);
      console.log(datesCopy);
      // console.log('goal data: ', goalData);
      // console.log('startDate: ', startDate, ' end date: ', endDate);
      res.json({dates, goalStartDate: startDate, goalEndDate: endDate});
    }
  } 
};

export default getGoalProgress;