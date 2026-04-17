import React, { useEffect } from 'react';
import MainLayout from '../layouts/MainLayout';
import PostCard from '../components/post/PostCard';
import EmptyState from '../components/common/EmptyState';
import Skeleton from '../components/common/Skeleton';
import useAuth from '../hooks/useAuth';
import useFeed from '../hooks/useFeed';
import UserSearch from '../components/user/UserSearch';
const HomePage = () => {
  const { user } = useAuth();

  const {
    posts,
    loading,
    likeLoadingId,
    commentLoadingId,
    fetchFeed,
    toggleLikeOptimistic,
    addComment,
  } = useFeed();

  useEffect(() => {
    fetchFeed(1, 10); // pagination ready
  }, [fetchFeed]);

  return (
    <MainLayout>
      <div className="mx-auto max-w-2xl space-y-4">
        <UserSearch/>
        {/* Loading State */}
        {loading && posts.length === 0 ? (
          <Skeleton count={3} />
        ) : posts.length === 0 ? (

          /* Empty Feed */
          <EmptyState
            title="No posts in your feed"
            description="Follow users or create a post to get started."
          />
        ) : (

          /* Feed Posts */
          posts.map((post) => (
            <PostCard
              key={post._id}
              post={post}
              currentUserId={user?._id}  // ⚠️ FIX (important)
              onToggleLike={toggleLikeOptimistic}
              onAddComment={addComment}
              liking={likeLoadingId === post._id}
              commenting={commentLoadingId === post._id}
            />
          ))
        )}
      </div>
    </MainLayout>
  );
};

export default HomePage;