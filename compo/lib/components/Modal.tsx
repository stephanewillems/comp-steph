import React, { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { CloseIcon } from '../icons/close-icon';
import { useTranslation } from 'react-i18next';

type Props = {
  children: ReactNode;
  onClose: () => void;
  heigth?: string;
  width?: string;
  hideCloseText?: boolean,
  centerOnScreen?: boolean
};

const MODAL_ROOT = document.getElementById('modal-root') || document.body;

const Modal = ({ children, onClose, heigth = 'w-[90%]', width = 'h-[90%]', hideCloseText = false, centerOnScreen = false}:Props) => {
  const { t } = useTranslation();
  return createPortal(
    (
      <div className={`fixed inset-0 z-[99999] w-full h-full overflow-y-auto bg-gray-600 bg-opacity-50 ${centerOnScreen && `flex items-center justify-center`}`} onClick={onClose}>
        {/* Stop propagation to prevent onClick from triggering when clicking inside */}
        <div className={`relative ${heigth} p-5 mx-auto bg-white border rounded-md shadow-lg ${width}`} onClick={e => e.stopPropagation()}>
          <div className="flex justify-end">
            <button 
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center mb-1"
              onClick={onClose}
            >
                {!hideCloseText && t('multiMap.sluiten')}
             <CloseIcon className={!hideCloseText ? "w-4 h-4 ml-1" : "w-4 h-4"} />
            </button>
          </div>
          {children}
        </div>
      </div>
    ),
    MODAL_ROOT,
  );
};

export default Modal;
