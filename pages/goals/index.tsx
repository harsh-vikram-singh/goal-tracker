import React from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useUserAllGoals } from 'data/goal';
import { CreateGoalDataInterface } from './create';
import HeadingWithAction from 'components/HeadingWithAction';
import NarrowContainer from 'components/layouts/NarrowContainer';
import GoalInfo from 'components/GoalInfo';
import Link from 'next/link';
import useDeleteGoal from 'data/deleteGoal'


export type GoalDataResponse = CreateGoalDataInterface & {goalId: string};
const GoalsIndexPage = () => {
  const { data, status } = useSession();
  const queryClient = useQueryClient();
  const {
    isUserGoalsError,
    isUserGoalsLoading,
    userGoalsData,
    userGoalsError
  } = useUserAllGoals();


  console.log('user goals: ', userGoalsData);
  const createNewGoalClickHandler = () => {
    console.log('click');
  }

  const handleEdit = () => {
    console.log('edit goal')
  }
  const {
    deleteUserGoal,
    deleteUserGoalError,
    deleteUserGoalLoading,
    deleteUserGoalResponse,
    deleteUserGoalSuccess
  } = useDeleteGoal();

  const handleDelete = (goalId: string) => {
    console.log('handle delete, with id: ', goalId);
    deleteUserGoal(goalId, {
      onSuccess: () => {
        queryClient.invalidateQueries(['userGoals'])
        // console.log('successful delete!')
      }
    })
  }

  if (status === 'unauthenticated') {
    return (
      <h1>Please login to view/create goals to track</h1>
    )
  }
  if (status === 'authenticated') {
    return (
      <NarrowContainer className="mt-4">
        <div className="pb-5 border-b border-gray-200 sm:flex sm:items-center sm:justify-between">
      <h3 className="text-lg leading-6 font-medium text-gray-900">
        Your Goals
      </h3>
      <div className="mt-3 sm:mt-0 sm:ml-4 border p-2 rounded hover:shadow">
        <Link href='/goals/create'>
          <a>Create new goal</a>
        </Link>
      </div>
    </div>
        {isUserGoalsLoading ? (
          <p>Loading Goals</p>
        ) : (
          <ul role='list' className='divide-y'>
            {userGoalsData.goals.map((goal: GoalDataResponse, idx: number) => {
              return (
                <GoalInfo
                  key={goal.goalId}
                  goalKey={idx}
                  goalId={goal.goalId}
                  goalTitle={goal.goalTitle}
                  goalDescription={goal.goalDescription}
                  goalStartDate={goal.goalStartDate}
                  goalEndDate={goal.goalEndDate}
                  goalRequiredSuccessfulDaysPercent={goal.goalRequiredSuccessfulDaysPercent}
                  handleEdit={handleEdit}
                  handleDelete={() => handleDelete(goal.goalId)}
                />
              )
            })}
          </ul>
        )}
      </NarrowContainer>
    )
  }
}

export default GoalsIndexPage;