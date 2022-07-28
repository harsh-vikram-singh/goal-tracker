import React from 'react';
import {TrashIcon} from '@heroicons/react/outline'
import { GoalDataResponse } from 'pages/goals';
import Link from 'next/link';


type GoalInfoProps = GoalDataResponse & {
  goalKey: number;
  handleEdit: () => void;
  handleDelete: () => void;
}

const GoalInfo = ({
  goalKey,
  goalId,
  goalTitle,
  goalDescription,
  goalStartDate,
  goalEndDate,
  goalRequiredSuccessfulDaysPercent,
  handleEdit,
  handleDelete,
}: GoalInfoProps) => {
  return (
    <li className='relative bg-white py-5 px-4 hover:bg-gray-50 hover:border-indigo-400'>
      <div className='grid grid-cols-2 gap-4 '>
        <div className=''>
          <p className="capitalize text-lg truncate">{goalTitle}</p>
          <p className='text-gray-600 truncate mt-1'>{goalDescription}</p>
          <div className='flex gap-10'>
            <p className='text-sm text-gray-400'>Start: {goalStartDate.split('T')[0]}</p>
            <p className='text-sm text-gray-400'>End: {goalEndDate.split('T')[0]}</p>
          </div>
        </div>
        <div className='flex gap-10 items-center justify-end'>
          <button className='border p-2 rounded hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>Update Progress</button>
          {/* <button className='border w-auto p-2 px-4 rounded shadow hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500' onClick={handleEdit}>
            Edit
          </button> */}
          <Link href={`/goals/edit/${goalKey}`}>
            <a>Edit</a>
          </Link>
          <TrashIcon className='w-6 text-red-600 hover:cursor-pointer' onClick={handleDelete}/>
        </div>
      </div>
    </li>
  );
}

export default GoalInfo