import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Loader from '../components/common/Loader';
import UserCard from '../components/user/UserCard';
import userService from '../services/userService';
import useAuth from '../hooks/useAuth';

export default function ProfilePage() {
  const { id } = useParams();
  const { user, refreshProfile } = useAuth();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [followLoading, setFollowLoading] = useState(false);

  const loadProfile = async () => {
    setLoading(true);
    try {
      const data = await userService.getProfile(id);
      setProfile(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, [id]);

  const onFollowToggle = async () => {
    if (!profile?.id || profile?.isSelf) return;
    setFollowLoading(true);
    try {
      const res = await userService.toggleFollow(profile.id);
      setProfile((prev) => {
        if (!prev) return prev;
        const nextFollowing = res.following;
        return {
          ...prev,
          isFollowing: nextFollowing,
          followersCount: nextFollowing ? prev.followersCount + 1 : prev.followersCount - 1,
        };
      });
      await refreshProfile();
    } finally {
      setFollowLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="mx-auto max-w-2xl space-y-4">
        {loading ? (
          <Loader text="Loading profile..." />
        ) : (
          <UserCard
            user={profile}
            isFollowing={profile?.isFollowing}
            onFollowToggle={onFollowToggle}
            loading={followLoading}
            isSelf={profile?.isSelf || profile?.id === user?.id}
          />
        )}
      </div>
    </MainLayout>
  );
}