import { NextApiRequest, NextApiResponse } from "next";
import db from 'prisma/client';

const deleteUserGoal = async (req: NextApiRequest, res: NextApiResponse) => {
  const {goalId} = req.query;
  const deletedGoal = await db.goal.delete({
    where: {
      id: goalId as string
    }
  })
  res.json({deletedGoal});
};

export default deleteUserGoal;