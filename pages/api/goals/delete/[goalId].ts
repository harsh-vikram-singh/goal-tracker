import { NextApiRequest, NextApiResponse } from "next";
import db from 'prisma/client';

const deleteUserGoal = async (req: NextApiRequest, res: NextApiResponse) => {
  const {goalId} = req.query;
  console.log('request to delete goal id: ', goalId);
  const deletedGoal = await db.goal.delete({
    where: {
      id: goalId as string
    }
  })
  console.log('deleted goal: ', deletedGoal);
  res.json({deletedGoal});
};

export default deleteUserGoal;