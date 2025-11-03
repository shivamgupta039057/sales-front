'use client';

import React, { useEffect } from 'react';
import { X } from 'lucide-react';

const DeleteStatusModal = ({ open, onClose, onConfirm, message = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.' }) => {
  useEffect(() => {
    if (!open) return;
    const onEsc = (e) => e.key === 'Escape' && onClose?.();
    document.addEventListener('keydown', onEsc);
    return () => document.removeEventListener('keydown', onEsc);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative w-full max-w-xl rounded-2xl bg-white shadow-xl border border-gray-200 p-6 z-10">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-2xl font-semibold text-gray-900">Delete Status</h3>
          <button onClick={onClose} className="h-9 w-9 inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white hover:bg-gray-50">
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>
        <p className="text-gray-600 text-sm mb-6">{message}</p>
        <div className="flex items-center justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 rounded-lg border border-gray-300 text-sm text-gray-700 hover:bg-gray-50">Cancel</button>
          <button onClick={onConfirm} className="px-4 py-2 rounded-lg bg-[#3B82F6] text-white text-sm hover:bg-[#2563EB]">Delete</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteStatusModal;


