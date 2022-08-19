import { NextApiRequest, NextApiResponse} from "next";
import db from 'prisma/client';
import { stringify } from "querystring";

const updateProgressForTheDay = async (req: NextApiRequest, res: NextApiResponse) => {
  const { body } = req;
  const {goalId, status, progressDate} = body;
  const goalData = await db.goal.findFirst({
    where: {
      id: goalId
    }
  });
  const userId = goalData && goalData.userId;
  const progressData = await db.progressTracker.create({
    data: {
      userId,
      goalId,
      Status: status,
      entryDate: new Date(progressDate)
    }
  })
  // console.log('goal data: ', goalData);
  // console.log('progress Data: ', progressData);
  res.json({updateProgress: 'OK'});

};

export default updateProgressForTheDay;