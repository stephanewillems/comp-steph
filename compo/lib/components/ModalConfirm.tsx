import React, { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { Button } from './buttons/Button';
import { AnimatePresence, motion } from 'framer-motion';
import { XmarkCircleIcon } from '../icons/xmark-circle';
import { WarningTriangleIcon } from '../icons/warning-triangle';
import { CheckmarkIcon } from '../icons/checkmark';
import { InfoTriangleIcon } from '../icons/info-square';

type Props = {
  children: ReactNode;
  onClose: () => void;
  onConfirm: () => void;
  isOpen: boolean;
  typeModal: 'delete' | 'confirm' | 'info' | 'warning';
  titleModal?: string;
  buttonsVariantCancel: 'secondary';
  buttonsVariantConfirm: 'delete' | 'info' | 'confirm' | 'warning';
  buttonsTextCancel: string | null;
  buttonsTextConfirm: string;
};

const modalRoot = document.getElementById('modal-root') || document.body;

const modalIcons = {
  delete: <XmarkCircleIcon className="h-10 w-10 fill-red-500" />,
  warning: <WarningTriangleIcon className="h-10 w-10 fill-yellow-500" />,
  confirm: <CheckmarkIcon className="h-10 w-10 fill-green-500" />,
  info: <InfoTriangleIcon className="h-10 w-10 fill-primary" />,
};

/**
 * Modal to confirm an action (yes or no)
 * @param {ReactNode} children
 * @return {React.ReactPortal}
 * @author Jens & Stéphane
 */
function ModalConfirm({
  children,
  onClose,
  onConfirm,
  isOpen,
  buttonsVariantConfirm = 'delete',
  buttonsVariantCancel = 'secondary',
  titleModal,
  buttonsTextCancel,
  buttonsTextConfirm,
  typeModal,
}: Props): React.ReactPortal {
  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="modal-confirm"
          className="fixed inset-0 z-50 flex h-full w-full items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0 bg-black bg-opacity-50 "
            style={{ opacity: 0.8, backdropFilter: 'blur(0px)' }}
            initial={{ opacity: 0.8, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(3px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            onClick={onClose}
          />
          {/* Stop propagation to prevent onClick from triggering when clicking inside */}
          <motion.div
            className="z-50 flex w-fit flex-col gap-1 rounded-lg bg-white shadow-xl"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <div className="grid grid-rows-[1fr_60px]">
              <div className="grid grid-cols-[40px_1fr] gap-3 px-4 pt-5">
                <div className="flex items-start justify-start">{modalIcons[typeModal]}</div>
                <div className="flex flex-col">
                  <h2 className="font-inter text-lg font-semibold">{titleModal}</h2>
                  <span className="pb-5 pt-3 text-left leading-5"> {children} </span>
                </div>
              </div>
              <div className=" bg-blue-light/30">
                <div className="flex flex-row items-center justify-end gap-3 pb-4 pr-6 pt-5">
                  {buttonsTextCancel !== null ? (
                    <Button variant={buttonsVariantCancel} onClick={onClose} className="font-medium text-black">
                      {buttonsTextCancel}
                    </Button>
                  ) : null}

                  <Button
                    variant={buttonsVariantConfirm}
                    onClick={() => {
                      onClose();
                      onConfirm();
                    }}
                    className="hover:scale-105"
                  >
                    {buttonsTextConfirm}
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    modalRoot
  );
}

export default ModalConfirm;
