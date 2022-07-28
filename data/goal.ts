import { useQuery } from '@tanstack/react-query';

const fetchAllUserGoals = async () => {
  const response = await fetch('/api/goals');
  if (!response.ok) {
    throw new Error('Error fetching user goals');
  }
  return response.json()
};

const fetchOneUserGoal = async (goalId: string) => {
  const response = await fetch(`/api/goals/${goalId}`);
  if (!response.ok) {
    throw new Error('Error fetching single user goal');
  }
  return response.json();
}

const useUserGoal = (goalId: string) => {
  const {
    isLoading: isUserGoalLoading,
    isError: isUserGoalError,
    data: userGoalData,
    error: userGoalError
  } = useQuery([`userGoal${goalId}`, goalId], () => fetchOneUserGoal(goalId))
  return {
    isUserGoalLoading,
    isUserGoalError,
    userGoalData,
    userGoalError,
  }
};

const useUserAllGoals = () => {
  const {
    isLoading: isUserGoalsLoading, 
    isError: isUserGoalsError,
    data: userGoalsData,
    error: userGoalsError
  } = useQuery(['userGoals'], fetchAllUserGoals);
  return {
    isUserGoalsError,
    isUserGoalsLoading,
    userGoalsData,
    userGoalsError
  }
}

export { 
  useUserAllGoals,
  useUserGoal
}