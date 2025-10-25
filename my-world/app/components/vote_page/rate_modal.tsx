import React from 'react'

interface VoteModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const VoteModal = ({ isOpen, onClose }: VoteModalProps) => {
  return (
    <div className='' onClick={onClose}>
        
    </div>
  )
}
