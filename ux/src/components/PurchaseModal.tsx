import React from 'react';

interface PurchaseConfirmationModalProps {
  itemName: string;
  onCancel: () => void;
  onConfirm: () => void;
}

const PurchaseConfirmationModal: React.FC<PurchaseConfirmationModalProps> = ({
  itemName,
  onCancel,
  onConfirm,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <div className="text-lg font-semibold">
          Realmente deseja comprar {itemName}?
        </div>
        <div className="flex justify-end mt-4">
          <button
            onClick={onCancel}
            className="bg-gray-300 hover:bg-gray-400 px-3 py-1 rounded-md mr-2"
          >
            Não
          </button>
          <button
            onClick={onConfirm}
            className="bg-blue-500 text-white px-3 py-1 rounded-md"
          >
            Sim
          </button>
        </div>
      </div>
    </div>
  );
};

export default PurchaseConfirmationModal;
