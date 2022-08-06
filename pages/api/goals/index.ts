import { NextApiRequest, NextApiResponse } from "next";
import db from "prisma/client";

const getUserGoals = async (req: NextApiRequest, res: NextApiResponse) => {
  const {query, body, cookies} = req;
  const sessionToken = cookies['next-auth.session-token'];
  if (!sessionToken) {
    res.status(401).redirect('/')
  }
  const session = await db.session.findFirst({
    where: {
      sessionToken: sessionToken
    },
    include: {
      user: {
        include: {
          Goal: {
            orderBy: {
              createdAt: 'asc'
            }
          }
        },
      }
    }
  });
  const goalsData = session?.user.Goal.map(goal => ({
    goalId: goal.id,
    goalUpdatedAt: goal.updatedAt,
    goalTitle: goal.goalTitle,    
    goalDescription: goal.goalDescription,
    goalStartDate: goal.goalStartDate,
    goalEndDate: goal.goalEndDate,
    goalRequiredSuccessfulDaysPercent: goal.goalRequiredSuccessfulDaysPercent,
  }))
  res.status(200).json({goals: goalsData});
};

export default getUserGoals;