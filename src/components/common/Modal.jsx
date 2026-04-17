import React, { useEffect } from 'react';
import Button from './Button';

export default function Modal({ isOpen, title, children, onClose, onConfirm, confirmText = 'Confirm' }) {
  useEffect(() => {
    const onEsc = (e) => {
      if (e.key === 'Escape') onClose?.();
    };
    if (isOpen) document.addEventListener('keydown', onEsc);
    return () => document.removeEventListener('keydown', onEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-5 shadow-xl">
        <h3 className="mb-3 text-lg font-semibold text-slate-900">{title}</h3>
        <div className="text-sm text-slate-700">{children}</div>
        <div className="mt-5 flex justify-end gap-2">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          {onConfirm && <Button onClick={onConfirm}>{confirmText}</Button>}
        </div>
      </div>
    </div>
  );
}