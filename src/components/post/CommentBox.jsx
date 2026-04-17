import React, { useState } from 'react';
import Button from '../common/Button';

export default function CommentBox({ onSubmit, loading = false }) {
  const [text, setText] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const value = text.trim();
    if (!value) return;
    await onSubmit(value);
    setText('');
  };

  return (
    <form onSubmit={handleSubmit} className="mt-3 flex items-center gap-2">
      <input
        type="text"
        placeholder="Write a comment..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="flex-1 rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
      />
      <Button type="submit" loading={loading}>
        Comment
      </Button>
    </form>
  );
}