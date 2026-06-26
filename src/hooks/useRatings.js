import useRatingStore from '../store/ratingStore';

export default function useRatings() {
  const {
    ratings,
    selectedUserRatings,
    isLoading,
    error,
    createRating,
    fetchUserRatings,
    clearError
  } = useRatingStore();

  return {
    ratings,
    selectedUserRatings,
    isLoading,
    error,
    createRating,
    fetchUserRatings,
    clearError
  };
}
