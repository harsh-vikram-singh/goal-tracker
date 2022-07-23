import type { NextApiRequest, NextApiResponse } from "next";
export default function GoalCreateHandler(req: NextApiRequest , res: NextApiResponse) {
  console.log(req.body)
  res.json({message: 'hello world'});
}