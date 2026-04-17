import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import CreatePostForm from '../components/post/CreatePostForm';
import postService from '../services/postService';

export default function CreatePostPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleCreate = async ({ content, imageFile }) => {
    setLoading(true);
    try {
      await postService.createPost({ content, imageFile });
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="mx-auto max-w-2xl">
        <CreatePostForm onSubmit={handleCreate} loading={loading} />
      </div>
    </MainLayout>
  );
}