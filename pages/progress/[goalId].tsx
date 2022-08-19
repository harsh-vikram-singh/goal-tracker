import React from 'react';
import { useRouter } from 'next/router';
import { useQueryClient } from '@tanstack/react-query';
import useGetProgress from 'data/getProgress';
import NarrowContainer from "components/layouts/NarrowContainer"
import UpdateProgressCalendar from 'components/calendar/UpdateProgressCalendar';
import Modal from 'components/modal';
import {XCircleIcon} from '@heroicons/react/outline';
import usePatchDayProgress from 'data/updateDayProgress';

interface UpdateGoalProps {
}
const UpdateGoal = () => {
  const [isModalOpen, setModalOpen] = React.useState<boolean>(false);
  const [selectedDate, setSelectedDate] = React.useState<string>('');
  const router = useRouter();
  const { goalId } = router.query;
  const queryClient = useQueryClient();
  // functions to update progress data
  const {
    updateProgress,
    updateProgressData,
    isUpdateProgressError,
    isUpdateProgressLoading,
    isUpdateProgressSuccess
  } = usePatchDayProgress();

  const { 
    getProgressData,
    getProgressError,
    getProgressIsError,
    getProgressIsLoading,
    getProgressIsSuccess
  } = useGetProgress(goalId as string);
  
  const updateStatus = (status: string) => {
    updateProgress({
      goalId,
      status,
      progressDate: selectedDate,
    },{
      onSuccess: () => {
        queryClient.invalidateQueries([`getProgress-goalId-${goalId}`])
        setModalOpen(val => !val)
      }
    })
  }

  // update progress data end
  if (!goalId || typeof(goalId) !== 'string') {
    return (
      <NarrowContainer>
        <p>Loading</p>
      </NarrowContainer>
    )
  }
  if (goalId && typeof(goalId) === 'string') {
    
    if (getProgressIsLoading) {
      return (
        <NarrowContainer>
          <p>Loading progress data</p>
        </NarrowContainer>
      )
    }
    
    return (
      <NarrowContainer>
        <h1 className='p-4 mb-6 text-xl'>Update Your Progress</h1>
        <UpdateProgressCalendar dates={getProgressData.dates} goalStartDate={new Date(getProgressData.goalStartDate)}
          goalEndDate={new Date(getProgressData.goalEndDate)}
          setModalOpen={setModalOpen}
          setSelectedDate={setSelectedDate}
          isModalOpen={isModalOpen}
        />
        <Modal open={isModalOpen} setOpen={setModalOpen} >
          <div className='relative'> 
            <h1>Update your progress for the day</h1>
            <XCircleIcon className="w-6 h-6 text-red-500 absolute top-0 right-0 hover:cursor-pointer" onClick={() => setModalOpen(isOpen => !isOpen)}/>
            <div className='flex justify-around mt-4'>
              {
                isUpdateProgressLoading ? (
                  <p>Updating Progress</p>
                ) : (
                  <>
                  <button 
                    onClick={() => updateStatus('success')}
                    className={`border rounded p-2 bg-green-600 text-white`}>Success</button>
                  <button 
                    onClick={() => updateStatus('failure')} 
                    className='border rounded p-2 bg-red-600 text-white'>Failure</button>
                  </>
                )
              }
            </div>
          </div>
        </Modal>
      </NarrowContainer>
    );
  }
};

export default UpdateGoal

