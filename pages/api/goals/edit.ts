import { syncBuiltinESMExports } from "module";
import { NextApiRequest, NextApiResponse } from "next"
import db from 'prisma/client';

const editGoalHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { body }  = req;
  let {
    goalTitle,
    goalDescription,
    goalStartDate,
    goalEndDate,
    goalRequiredSuccessfulDaysPercent
  } = body;

  goalStartDate = new Date(goalStartDate)
  goalEndDate = new Date(goalEndDate)
  const savedGoal = await db.goal.update({
    where: {
      id: body.goalId
    },
    data: {
      goalTitle,
      goalDescription,
      goalStartDate,
      goalEndDate,
      goalRequiredSuccessfulDaysPercent
    }
  })
  res.json({updatedGoalData: body});
}

export default editGoalHandler;