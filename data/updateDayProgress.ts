import { useMutation } from '@tanstack/react-query';
import { ROUTES } from 'apiRoutes';

const patchDayProgress = async (progressData: any) => {
  // TODO: remove any and write type for progressData
  const url = ROUTES.PROGRESS.UPDATE;
  try {
    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(progressData),
    })
    return response.json();
  } catch (error) {
    throw new Error('Progress update failed');
  }
};

const usePatchDayProgress = () => {
  const {
    mutate: updateProgress,
    data: updateProgressData,
    isError: isUpdateProgressError,
    isLoading: isUpdateProgressLoading,
    isSuccess: isUpdateProgressSuccess,
  } = useMutation(patchDayProgress);
  return {
    updateProgress,
    updateProgressData,
    isUpdateProgressError,
    isUpdateProgressLoading,
    isUpdateProgressSuccess
  }
};

export default usePatchDayProgress;