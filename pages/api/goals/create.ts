import type { NextApiRequest, NextApiResponse } from "next";
import db from 'prisma/client';

export default async function GoalCreateHandler(req: NextApiRequest , res: NextApiResponse) {
  const { body } = req;
  const user = await db.user.findUnique({
    where: {
      email: body.userEmailId
    }
  })
  // const {body: goalData} = req.body;
  // console.log('goal data: ', goalData);
  console.log(user);
  const {
    goalTitle,
    goalDescription,
    goalStartDate,
    goalEndDate,
    goalRequiredSuccessfulDaysPercent,
  } = body;

  if (user) {
    const goalData = await db.goal.create({
      data: {
        goalTitle,
        goalDescription,
        goalStartDate: new Date(goalStartDate),
        goalEndDate: new Date(goalEndDate),
        goalRequiredSuccessfulDaysPercent: parseInt(goalRequiredSuccessfulDaysPercent),
        userId: user.id
      }
    })
    res.json({message: 'OK', goalData});
  } else {
    res.json({message: 'ERROR'})
  }
}