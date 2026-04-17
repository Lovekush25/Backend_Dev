import React, { useState } from 'react';
import Button from '../common/Button';

export default function CreatePostForm({ onSubmit, loading = false }) {
  const [content, setContent] = useState('');
  const [imageFile, setImageFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const value = content.trim();
    if (!value) return;
    await onSubmit({ content: value, imageFile });
    setContent('');
    setImageFile(null);
    if (e.target?.reset) e.target.reset();
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <label htmlFor="content" className="mb-2 block text-sm font-medium text-slate-700">
        What’s on your mind?
      </label>
      <textarea
        id="content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your post..."
        className="min-h-[120px] w-full resize-none rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
      />

      <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <input
          type="file"
          accept="image/png,image/jpeg,image/webp"
          onChange={(e) => setImageFile(e.target.files?.[0] || null)}
          className="block w-full text-sm text-slate-600 file:mr-4 file:rounded-xl file:border-0 file:bg-slate-100 file:px-4 file:py-2 file:text-sm file:font-medium file:text-slate-800 hover:file:bg-slate-200"
        />

        <Button type="submit" loading={loading}>
          Publish Post
        </Button>
      </div>
    </form>
  );
}