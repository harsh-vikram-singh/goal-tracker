import React from 'react';
import { useSession } from 'next-auth/react';
import useUserGoals from 'data/goal';
import { GoalDataInterface } from './create';
import HeadingWithAction from 'components/HeadingWithAction';
import NarrowContainer from 'components/layouts/NarrowContainer';
import GoalInfo from 'components/GoalInfo';
import { WhiteButton } from 'components/buttons';
import Link from 'next/link';

const GoalsIndexPage = () => {
  const { data, status } = useSession();
  const {
    isUserGoalsError,
    isUserGoalsLoading,
    userGoalsData,
    userGoalsError
  } = useUserGoals();

  const createNewGoalClickHandler = () => {
    console.log('click');
  }

  const handleEdit = () => {
    console.log('edit goal')
  }

  const handleDelete = () => {
    console.log('handle delete');
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
            {userGoalsData.goals.map((goal: GoalDataInterface, idx: number) => {
              return (
                <GoalInfo
                  key={idx}
                  goalTitle={goal.goalTitle}
                  goalDescription={goal.goalDescription}
                  goalStartDate={goal.goalStartDate}
                  goalEndDate={goal.goalEndDate}
                  goalRequiredSuccessfulDaysPercent={goal.goalRequiredSuccessfulDaysPercent}
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}
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