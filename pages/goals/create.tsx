import React from "react";
import InputWithValidationError from "components/InputWithValidationError";
import TextAreaWithMaxLength from "components/TextAreaWithMaxLength";
import { useSession } from "next-auth/react";
import NarrowContainer from "components/layouts/NarrowContainer";
import next from "next";
import Router from "next/router";

export interface CreateGoalDataInterface {
  goalTitle: string;
  goalDescription: string;
  goalStartDate: string;
  goalEndDate: string;
  goalRequiredSuccessfulDaysPercent: number;
}

type key = 'title' | 'description' | 'startDate' | 'endDate';

interface FormDateUpdateShape {
  key: key;
  value: any;
}

const CreateGoal = () => {
  const emptyGoalData = {
    goalTitle: '',
    goalDescription: '',
    goalStartDate: '',
    goalEndDate: '',
    goalRequiredSuccessfulDaysPercent: 80
  };

  const [goalData, setGoalData] = React.useState<CreateGoalDataInterface>(emptyGoalData);
  const { data: userData, status} = useSession();

  const handleFormDataUpdate = (data: FormDateUpdateShape) => {
    setGoalData(goal => {
      return {...goal, ...{[data.key]: data.value}}
    }
  )};

  const handleResetClick = () => {
    setGoalData(emptyGoalData);
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const endPoint = '/api/goals/create' // remove the hard coded string
    const userGoalData = {...goalData, userEmailId: userData?.user?.email}
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userGoalData)
    };
    const response = await fetch(endPoint, options);
    if (response.ok) {
      Router.push('/goals');
    }
  }
  return (
      <NarrowContainer className="max-w-xl border  hover:shadow-cyan-500/50 mt-10 p-8 rounded-lg flex flex-col">
        <h4 className='text-xl mb-4'>Create Goal</h4>
        <form className="pt-4" onSubmit={e => handleSubmit(e)}
          onChange={e => handleFormDataUpdate({key: e.target.name, value: e.target.value})} 
        >
          <div className="flex flex-col gap-y-10">
            <InputWithValidationError
              type="text"
              id="goalTitle"
              name="goalTitle"
              labelValue="Title"
              placeholder="give your goal a name"
              value={goalData.goalTitle}
            />
            <TextAreaWithMaxLength
              id="goalDescription"
              name="goalDescription"
              placeholder="Describe your goal. Make it as specific as you can"
              labelValue="Description"
              maxLength={200}
              minLength={1}
              value={goalData.goalDescription}
            />
            <div className="flex flex-col gap-y-10">
              <div className="flex flex-col">
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="goalStartDate"
                >
                  Start date:{" "}
                </label>
                <input
                  name="goalStartDate"
                  className="border p-2 rounded text-slate-400"
                  type="date"
                  placeholder="start date"
                  value={goalData.goalStartDate}
                />
              </div>
              <div className="flex flex-col">
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="goalEndDate"
                >
                  End Date:{" "}
                </label>
                <input name="goalEndDate" 
                  className="border p-2 rounded text-slate-400" 
                  type="date"
                  value={goalData.goalEndDate}
                />
              </div>
            </div>
            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="goalRequiredSuccessfulDaysPercent"
              >Percentage of successful days required to achieve: </label>
              <input className="border rounded p-2" 
                name="goalRequiredSuccessfulDaysPercent"
                type="number" min="1" max="100" value={goalData.goalRequiredSuccessfulDaysPercent}/>%
            </div>
            <div className="flex justify-between">
              <button
                type="submit"
                className="w-40 items-center px-4 py-2 border border-gray-300 shadow-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Create Goal
              </button>
              <button
                type="button"
                className="w-40 items-center px-4 py-2 border border-red-300 shadow-sm font-medium rounded-md text-red-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={handleResetClick}
              >
                Reset
              </button>
            </div>
          </div>
        </form>
      </NarrowContainer>
  );
};

export default CreateGoal;
