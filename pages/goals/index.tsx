import React from 'react';
import { useSession } from 'next-auth/react';
import useUserGoals from 'data/goal';

const GoalsIndexPage = () => {
  const { data, status } = useSession();
  const {
    isUserGoalsError,
    isUserGoalsLoading,
    userGoalsData,
    userGoalsError
  } = useUserGoals()
  if (status === 'unauthenticated') {
    return (
      <h1>Please login to view/create goals to track</h1>
    )
  }
  if (status === 'authenticated') {
    if (userGoalsData && Array.isArray(userGoalsData.goals) && userGoalsData.goals.length > 0) {
      return (
        <>
          {userGoalsData.goals.map(goal => {
            return (
              <p>{goal.goalTitle}</p>
            )
          })}
        </>
      )
    } else {
      <p>Please create a goal to view your goals</p>
    }
  }
}

export default GoalsIndexPage;