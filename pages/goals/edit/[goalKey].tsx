import React, { useState } from "react";
import { useRouter } from "next/router";
import { useUserAllGoals } from "data/goal";
import NarrowContainer from "components/layouts/NarrowContainer";
import { UserGoalInterface } from "data/goal";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools/build/types/react-query-devtools/src/devtools";
import Link from "next/link";

const EditGoalPage = () => {
  const [editGoalData, setEditGoalData] = useState(() => null);
  const router = useRouter();
  const { goalKey } = router.query;
  const goalIndex = parseInt(goalKey as string);
  console.log("index of selected goal: ", goalIndex);
  const {
    isUserGoalsError,
    isUserGoalsLoading,
    userGoalsData,
    userGoalsError,
  } = useUserAllGoals();
  console.log("userGoalsData: ", userGoalsData);
  const selectedGoalsData = userGoalsData?.goals[goalIndex];
  if (selectedGoalsData && !editGoalData) {
    setEditGoalData(selectedGoalsData);
  }
  if (isUserGoalsLoading) {
    return <NarrowContainer>Loading goal data...</NarrowContainer>;
  }
  if (selectedGoalsData) {
    return (
      <NarrowContainer className="mt-10 max-w-lg shadow p-4 border rounded-lg">
        <h1 className='underline'>Edit Goal Deatils </h1>
        <form className="flex flex-col gap-10 mt-10">
          <div>
            <label>
              Title:
              <input name='goalTitle' value={editGoalData?.goalTitle} placeholder="Enter goal title"
                className="block rounded border w-full p-2"
              />
            </label>
          </div>
          <div>
            <label htmlFor="editGoalDescription">
              Description
            </label>
            <textarea 
              className="border w-full"
              value={editGoalData?.goalDescription}
              name="goalDescription"
            />
          </div>
          <div>
            <label>
              Start date: <input className="border p-2 rounded block" type="date" value={editGoalData?.goalStartDate?.split('T')[0]}/>
            </label><br/><br/>
            <label>
              End date: <input className="border p-2 rounded block" name="goalEndDate" type="date" value={editGoalData?.goalEndDate?.split('T')[0]} />
            </label>
          </div>
          <div>
            <label>
              Days of consistent effor required:
              <input 
                className="border p-2 rounded w-10"
                type='text' name="goalRequiredSuccessfulDaysPercent" value={editGoalData?.goalRequiredSuccessfulDaysPercent} />
              %
            </label>
          </div>
          <div className="flex justify-between">
            <button className="border shadow-sm p-2 rounded border-green-400">Update</button>
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
