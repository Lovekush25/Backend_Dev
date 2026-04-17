import React, { useState, useEffect } from 'react';
import userService from '../../services/userService';
import UserCard from './UserCard';
import useFeed from '../../hooks/useFeed';

export default function UserSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [followLoadingId, setFollowLoadingId] = useState(null);

  const { fetchFeed } = useFeed();

  // 🔥 DEBOUNCE SEARCH
  useEffect(() => {
    const delay = setTimeout(() => {
      if (query.length >= 2) {
        searchUsers(query);
      } else {
        setResults([]);
      }
    }, 400); // 400ms delay

    return () => clearTimeout(delay);
  }, [query]);

  const searchUsers = async (value) => {
    setLoading(true);
    try {
      const users = await userService.searchUsers(value);
      setResults(users);
    } catch (err) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 🔥 FOLLOW / UNFOLLOW
  const handleFollow = async (userId) => {
    setFollowLoadingId(userId);

    try {
      const res = await userService.toggleFollow(userId);

      // 🔥 instant UI update
      setResults((prev) =>
        prev.map((u) =>
          u.id === userId
            ? {
                ...u,
                isFollowing: res.following,
                followersCount: res.following
                  ? (u.followersCount || 0) + 1
                  : Math.max((u.followersCount || 1) - 1, 0),
              }
            : u
        )
      );

      // 🔥 refresh feed (important)
      fetchFeed(1);
    } catch (err) {
      console.error(err.message);
    } finally {
      setFollowLoadingId(null);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto space-y-4">
      
      {/* 🔍 Search Input */}
      <input
        type="text"
        placeholder="Search users..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* ⏳ Loading */}
      {loading && (
        <p className="text-sm text-gray-500">Searching...</p>
      )}

      {/* 👤 Results */}
      <div className="space-y-3">
        {results.map((user) => (
          <UserCard
            key={user.id}
            user={user}
            isFollowing={user.isFollowing}
            loading={followLoadingId === user.id}
            onFollowToggle={() => handleFollow(user.id)}
          />
        ))}
      </div>

      {/* ❌ No Results */}
      {!loading && query.length >= 2 && results.length === 0 && (
        <p className="text-sm text-gray-500">No users found</p>
      )}
    </div>
  );
}