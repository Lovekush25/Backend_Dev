import { useContext } from 'react';
import { FeedContext } from '../context/FeedContext';

/**
 * Custom Hook for accessing Feed Context
 * Ensures proper usage inside FeedProvider
 */
const useFeed = () => {
  const context = useContext(FeedContext);

  if (!context) {
    throw new Error('useFeed must be used within a FeedProvider');
  }

  return context;
};

export default useFeed;