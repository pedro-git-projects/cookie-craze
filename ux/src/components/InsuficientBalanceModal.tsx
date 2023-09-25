import React from 'react';

interface InsufficientBalanceModalProps {
  onClose: () => void;
}

const InsufficientBalanceModal: React.FC<InsufficientBalanceModalProps> = ({
  onClose,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <div className="text-lg font-semibold">Saldo insuficiente!</div>
        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="bg-blue-500 text-white px-3 py-1 rounded-md"
          >
            Ok
          </button>
        </div>
      </div>
    </div>
  );
};

export default InsufficientBalanceModal;
