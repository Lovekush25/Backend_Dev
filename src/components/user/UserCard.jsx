import React, { useState } from 'react';
import Button from '../common/Button';
import userService from '../../services/userService';
import useFeed from '../../hooks/useFeed';

export default function UserCard({
  user,
  isFollowing: initialFollowing,
  isSelf = false,
}) {
  const [isFollowing, setIsFollowing] = useState(initialFollowing);
  const [loading, setLoading] = useState(false);

  const { fetchFeed } = useFeed(); // 🔥 important

  const handleFollowToggle = async () => {
    if (loading) return;

    setLoading(true);
    try {
      const res = await userService.toggleFollow(user.id);

      setIsFollowing(res.following); // update button UI

      // 🔥 VERY IMPORTANT: refresh feed after follow
      await fetchFeed(1);
    } catch (error) {
      console.error('Follow error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-200 text-base font-semibold text-slate-700">
          {user?.name?.[0] || 'U'}
        </div>

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-slate-900">
            {user?.name}
          </p>
          <p className="truncate text-xs text-slate-500">
            @{user?.username}
          </p>
        </div>

        {!isSelf && (
          <Button
            variant={isFollowing ? 'secondary' : 'primary'}
            loading={loading}
            onClick={handleFollowToggle}
          >
            {isFollowing ? 'Unfollow' : 'Follow'}
          </Button>
        )}
      </div>

      {user?.bio && (
        <p className="mt-3 text-sm text-slate-700">{user.bio}</p>
      )}

      <div className="mt-3 flex gap-4 text-xs text-slate-600">
        <span>Followers: {user?.followersCount ?? 0}</span>
        <span>Following: {user?.followingCount ?? 0}</span>
      </div>
    </div>
  );
}