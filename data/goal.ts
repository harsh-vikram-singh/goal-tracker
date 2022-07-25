import { useQuery } from '@tanstack/react-query';

const fetchUserGoals = async () => {
  const response = await fetch('/api/goals');
  if (!response.ok) {
    throw new Error('Error fetching user goals');
  }
  return response.json()
};

const useUserGoals = () => {
  const {
    isLoading: isUserGoalsLoading, 
    isError: isUserGoalsError,
    data: userGoalsData,
    error: userGoalsError
  } = useQuery(['userGoals'], fetchUserGoals);
  return {
    isUserGoalsError,
    isUserGoalsLoading,
    userGoalsData,
    userGoalsError
  }
}

export default useUserGoals;