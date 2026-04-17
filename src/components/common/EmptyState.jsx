import React from 'react';
import Button from './Button';

export default function EmptyState({ title, description, actionText, onAction }) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center">
      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      {description && <p className="mt-2 text-sm text-slate-600">{description}</p>}
      {actionText && onAction && (
        <Button className="mt-4" onClick={onAction}>
          {actionText}
        </Button>
      )}
    </div>
  );
}