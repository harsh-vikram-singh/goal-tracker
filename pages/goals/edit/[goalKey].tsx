import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useUserAllGoals } from "data/goal";
import NarrowContainer from "components/layouts/NarrowContainer";
import { CreateGoalDataInterface } from "../create";
import usePatchUserGoal from "data/patchGoal";
import Link from "next/link";

const EditGoalPage = () => {
  const emptyGoalData = {
    goalIndex: -1,
    goalTitle: '',
    goalDescription: '',
    goalStartDate: '',
    goalEndDate: '',
    goalRequiredSuccessfulDaysPercent: 80
  };
  const [editGoalData, setEditGoalData] = useState<CreateGoalDataInterface & {goalIndex: number}>(emptyGoalData);
  const router = useRouter();
  const { goalKey } = router.query;
  const goalIndex = parseInt(goalKey as string);

  // useEffect(() => {
  //   const testFetch = async () => {
  //     const response = await fetch('/api/goals/edit', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify({messageFromClient: 'Hello, server'})
  //     });
  //     const result = await response.json();
  //     console.log('response from server in test effect: ', result);
  //   };
  //   console.log('triggering test fetch from effect')
  //   testFetch();
  // })

  const {
    isUserGoalsError,
    isUserGoalsLoading,
    userGoalsData,
    userGoalsError,
  } = useUserAllGoals();

  const selectedGoalsData = userGoalsData?.goals[goalIndex];
  selectedGoalsData.goalStartDate = selectedGoalsData.goalStartDate.split('T')[0];
  selectedGoalsData.goalEndDate = selectedGoalsData.goalEndDate.split('T')[0];
  if (selectedGoalsData && editGoalData.goalIndex === -1) {
    setEditGoalData(selectedGoalsData);
  }

  const { 
    mutateUserGoal,
    editedUserGoal,
    isEditUserGoalError,
    isEditUserGoalLoading,
    isEditUserGoalSuccess,
   } = usePatchUserGoal();
  const handleUpdateClick = (e) => {
    e.preventDefault();
    mutateUserGoal(editGoalData, {
      onSuccess: (data) => console.log('from onSuccess callback: ', data),
      onError: error => console.log('error from onError of patch user data: ', error)
    })
  };

  const handleChange = (changeShape: {key: string; value: string}) => {
    console.log(changeShape)
    setEditGoalData(goalData => {
      return {
        ...goalData,
        [changeShape.key]: changeShape.value
      }
    })
  };

  if (isUserGoalsLoading) {
    return <NarrowContainer>Loading goal data...</NarrowContainer>;
  }
  if (selectedGoalsData) {
    return (
      <NarrowContainer className="mt-10 max-w-xl shadow p-4 border rounded-lg">
        <h1 className='underline'>Edit Goal Deatils </h1>
        <form className="flex flex-col gap-10 mt-10" onSubmit={e => {handleUpdateClick(e)}}>
          <div>
            <label>
              Title:
              <input 
                onChange={(e) => handleChange({key: e.target.name, value: e.target.value})}
                name='goalTitle' value={editGoalData?.goalTitle} placeholder="Enter goal title"
                className="block rounded border w-full p-2"/>
            </label>
          </div>
          <div>
            <label htmlFor="editGoalDescription">
              Description
            </label>
            <textarea 
              onChange={e => handleChange({key: e.target.name, value: e.target.value})}
              className="border w-full"
              value={editGoalData?.goalDescription}
              name="goalDescription"
            />
          </div>
          <div>
            <label>
              Start date: 
              <input 
                onChange={e => handleChange({key: e.target.name, value: e.target.value})}
                className="border p-2 rounded block" 
                type="date" value={editGoalData?.goalStartDate?.split('T')[0]}
              />
            </label><br/><br/>
            <label>
              End date: 
              <input 
                onChange={e => handleChange({key: e.target.name, value: e.target.value})}
                className="border p-2 rounded block" 
                name="goalEndDate" type="date" value={editGoalData?.goalEndDate?.split('T')[0]} />
            </label>
          </div>
          <div>
            <label>
              Days of consistent effor required:
              <input 
                onChange={e => handleChange({key: e.target.name, value: e.target.value})}
                className="border p-2 rounded w-10"
                type='text' name="goalRequiredSuccessfulDaysPercent" value={editGoalData?.goalRequiredSuccessfulDaysPercent} />
              %
            </label>
          </div>
          <div className="flex justify-between">
            <button
              type='submit'
              className="border shadow-sm p-2 rounded border-green-400">Update</button>
            <Link href='/goals'>
              <a className="border shadow-sm p-2 rounded">Back</a>
            </Link>
          </div>
        </form>
      </NarrowContainer>
    );
  }
};

export default EditGoalPage;
