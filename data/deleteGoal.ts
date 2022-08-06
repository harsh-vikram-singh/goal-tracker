import { useMutation } from '@tanstack/react-query';
import { ROUTES } from 'apiRoutes'

const deleteGoal= async (goalId: string) => {
  const url = `${ROUTES.GOAL.DELETE}/${goalId}`
  const response = await fetch (url, {
    method: 'DELETE',
  })
  return response.json();
}

const useDeleteGoal = () => {
  const {
    mutate: deleteUserGoal,
    isError: deleteUserGoalError,
    isSuccess: deleteUserGoalSuccess,
    isLoading: deleteUserGoalLoading,
    data: deleteUserGoalResponse
  } = useMutation(deleteGoal);
  return {
    deleteUserGoal,
    deleteUserGoalError,
    deleteUserGoalSuccess,
    deleteUserGoalLoading,
    deleteUserGoalResponse
  };
};

export default useDeleteGoal;
