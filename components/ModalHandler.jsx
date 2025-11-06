'use client';

import React, { useState, useEffect } from 'react';
import AddSingleLeadModal from '@/app/leads/components/AddSingleLead';
import BulkUploadModal from '@/app/leads/components/BulkUploadModal';

const ModalHandler = () => {
  const [modalType, setModalType] = useState(null);

  useEffect(() => {
    const handleOpenModal = (event) => {
      const { type } = event.detail || {};
      console.log('Modal event received:', type); // Debug log
      if (type === 'add-single-lead') {
        setModalType('add-single-lead');
      } else if (type === 'add-from-excel') {
        setModalType('add-from-excel');
      }
      // Add other modal types here as needed
    };

    window.addEventListener('openLeadModal', handleOpenModal);
    console.log('ModalHandler: Event listener added'); // Debug log
    return () => {
      window.removeEventListener('openLeadModal', handleOpenModal);
    };
  }, []);

  const handleClose = () => {
    setModalType(null);
  };

  useEffect(() => {
    console.log('ModalHandler: modalType changed to:', modalType);
  }, [modalType]);

  return (
    <>
      {modalType === 'add-single-lead' && (
        <AddSingleLeadModal open={true} onClose={handleClose} />
      )}
      {modalType === 'add-from-excel' && (
        <BulkUploadModal open={true} onClose={handleClose} />
      )}
    </>
  );
};

export default ModalHandler;

