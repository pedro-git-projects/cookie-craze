import React from 'react';

interface PurchaseSuccessModalProps {
  onClose: () => void;
}

const PurchaseSuccessModal: React.FC<PurchaseSuccessModalProps> = ({
  onClose,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <div className="text-lg font-semibold">Comprado com sucesso!</div>
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

export default PurchaseSuccessModal;
