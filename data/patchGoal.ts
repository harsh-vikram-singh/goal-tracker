import { useMutation } from "@tanstack/react-query";
import { ROUTES } from "apiRoutes";

const patchUserGoal = async (goalData) => {
  const url = ROUTES.GOAL.UPDATE;
  console.log('from fetch func: goalData: ', goalData);
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
  } = useMutation(patchUserGoal, {
    onMutate: (goalData) => {
      console.log('triggering mutation with : ', goalData);
    }
  });
  return {
    mutateUserGoal,
    editedUserGoal,
    isEditUserGoalError,
    isEditUserGoalLoading,
    isEditUserGoalSuccess,
  }
}

export default usePatchUserGoal;