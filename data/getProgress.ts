import { useQuery } from "@tanstack/react-query";
import { ROUTES } from 'apiRoutes';
import type { SingleDateInfo } from 'server.utils/date'

const getGoalProgress= async (goalId: string) => {
  const url = `${ROUTES.PROGRESS.LIST}/${goalId}`;
  const response = await fetch(url);
  return response.json();
};

interface GetProgressDataInterface {
  meta: {
    currentMonth: number;
  };
  dates: Array<SingleDateInfo>;
}

const useGetProgress = (goalId: string) => {
  const {
  data: getProgressData,
  error: getProgressError,
  isError: getProgressIsError,
  isSuccess: getProgressIsSuccess,
  isLoading: getProgressIsLoading,
  } = useQuery([`getProgress-goalId-${goalId}`], () => getGoalProgress(goalId));
  return {
    getProgressData,
    getProgressError,
    getProgressIsError,
    getProgressIsSuccess,
    getProgressIsLoading
  }
}

export default useGetProgress;