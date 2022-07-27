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
          Goal: true
        }
      }
    }
  });
  console.log('query: ', query);
  console.log('body: ', body);
  console.log('cookies: ', cookies);
  res.status(200).json({goals: session?.user.Goal});
};

export default getUserGoals;