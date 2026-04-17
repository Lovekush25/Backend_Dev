import React, { useMemo, useState } from 'react';
import Button from '../common/Button';
import CommentBox from './CommentBox';
import { formatDate } from '../../utils/formatDate';

export default function PostCard({
  post,
  currentUserId,
  onToggleLike,
  onAddComment,
  onEdit,
  onDelete,
  liking = false,
  commenting = false,
}) {
  const [showComments, setShowComments] = useState(false);

  const likedByMe = useMemo(
    () => post.likes?.some((id) => String(id) === String(currentUserId)),
    [post.likes, currentUserId]
  );

  const isAuthor = String(post.author?._id || post.author?.id || post.author) === String(currentUserId);

  const handleComment = async (text) => {
    await onAddComment(post._id, text);
    setShowComments(true);
  };

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <header className="mb-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-200 text-sm font-semibold text-slate-700">
            {post.author?.name?.[0] || 'U'}
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900">{post.author?.name}</p>
            <p className="text-xs text-slate-500">
              @{post.author?.username} • {formatDate(post.createdAt)}
            </p>
          </div>
        </div>

        {isAuthor && (
          <div className="flex gap-2">
            <Button variant="secondary" onClick={() => onEdit?.(post)}>
              Edit
            </Button>
            <Button variant="danger" onClick={() => onDelete?.(post)}>
              Delete
            </Button>
          </div>
        )}
      </header>

      <p className="whitespace-pre-wrap text-sm leading-relaxed text-slate-800">{post.content}</p>

      {post.image?.url ? (
        <div className="mt-3 overflow-hidden rounded-2xl border border-slate-200">
          <img src={post.image.url} alt="Post" className="h-auto w-full object-cover" />
        </div>
      ) : null}

      <div className="mt-4 flex items-center gap-2">
        <Button variant={likedByMe ? 'danger' : 'secondary'} loading={liking} onClick={() => onToggleLike(post._id)}>
          {likedByMe ? 'Unlike' : 'Like'} ({post.likes?.length || 0})
        </Button>
        <Button variant="ghost" onClick={() => setShowComments((s) => !s)}>
          Comments ({post.comments?.length || 0})
        </Button>
      </div>

      {showComments && (
        <section className="mt-3 border-t border-slate-200 pt-3">
          <div className="space-y-2">
            {post.comments?.length ? (
              post.comments.map((comment) => (
                <div key={comment._id} className="rounded-lg bg-slate-50 p-2">
                  <p className="text-xs font-medium text-slate-700">@{comment.user?.username || 'user'}</p>
                  <p className="text-sm text-slate-800">{comment.text}</p>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-500">No comments yet.</p>
            )}
          </div>
          <CommentBox onSubmit={handleComment} loading={commenting} />
        </section>
      )}
    </article>
  );
}