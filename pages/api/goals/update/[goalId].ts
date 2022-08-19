import { NextApiRequest, NextApiResponse } from "next";

const updateGoalProgress = (req: NextApiRequest, res: NextApiResponse) => {
  const { goalId } = req.query;
  console.log('received updates for goal id: ', goalId);
  res.json({message: 'UPDATE OK'});
};

export default updateGoalProgress;