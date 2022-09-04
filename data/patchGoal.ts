import { useMutation } from "@tanstack/react-query";
import { ROUTES } from "apiRoutes";

const patchUserGoal = async (goalData: any) => {
  const url = ROUTES.GOAL.UPDATE;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(goalData)
  });
  return response.json()
}

const usePatchUserGoal = () => {
  const {
    mutate: mutateUserGoal,
    data: editedUserGoal,
    isError: isEditUserGoalError,
    isLoading: isEditUserGoalLoading,
    isSuccess: isEditUserGoalSuccess,
  } = useMutation(patchUserGoal);
  return {
    mutateUserGoal,
    editedUserGoal,
    isEditUserGoalError,
    isEditUserGoalLoading,
    isEditUserGoalSuccess,
  }
}

export default usePatchUserGoal;