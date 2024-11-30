import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import ModalSteps from './ModalSteps/ModalSteps';
import ModalFooter from './ModalFooter/ModalFooter';

/* 
* Component for rendering modal form
* @param isOpen - boolean to check if modal is open
* @param onClose - function to close modal
* @param steps - array of steps
* @param customCurrentStepId - custom current step id
* @param customHandleNextClick - custom handle next click
* @param customHandlePrevClick - custom handle prev click
* @returns - returns modal form
* @example
* const steps = [
* { id: 1, title: 'Step 1', component: <Step1 />, isValid: () => true },
* { id: 2, title: 'Step 2', component: <Step2 />, isValid: () => true },
* { id: 3, title: 'Step 3', component: <Step3 />, isValid: () => true },
* ];
* <ModalForm isOpen={isOpen} onClose={handleClose} steps={steps} />
* 
*/

export interface Step {
  id: number;
  title: string;
  component: JSX.Element;
  isValid: () => boolean;
  disabledLastStep?: () => boolean;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  steps: Step[];
  // Additional props in case we need to provide a more complex logic to Steps
  customCurrentStepId?: number;
  customHandleNextClick?: () => void
  customHandlePrevClick?: () => void
  textFinishButton?: string;
  handlerFinishButton?: () => void;
}

const modalRoot = document.getElementById('modal-root') || document.body;

const ModalForm = ({ isOpen, onClose, steps, customCurrentStepId, customHandleNextClick, customHandlePrevClick, textFinishButton, handlerFinishButton }: ModalProps) => {

  const handleClose = () => {
    setCurrentStepId(1);
    onClose();
  }

  const handleNextClick = () => {
    if (currentStepId === steps.length) return;
    setCurrentStepId(prev => prev + 1)
  }

  const handlePrevClick = () => {
    if (currentStepId === 1) return;
    setCurrentStepId(prev => prev - 1)
  }

  // Use custom if it's defined; otherwise, use default 1.
  const [currentStepId, setCurrentStepId] = useState(1);

  if (!isOpen) return null;
  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-filter backdrop-blur-sm">
      <div className="z-50 bg-white rounded-lg w-[80%] h-[80%] grid grid-rows-[170px_2fr_80px]">
        <div className="flex items-center py-20 px-14 ">
          <ModalSteps steps={steps} currentStepId={customCurrentStepId ? customCurrentStepId : currentStepId} />
        </div>
        <div className='w-full p-10 pt-0 overflow-y-auto'>
          {steps[(customCurrentStepId ? customCurrentStepId : currentStepId) - 1].component}
        </div>
        <ModalFooter
          onClose={handleClose}
          onNextClick={customHandleNextClick ? customHandleNextClick : handleNextClick}
          onPrevClick={customHandlePrevClick ? customHandlePrevClick : handlePrevClick}
          currentStepId={customCurrentStepId ? customCurrentStepId : currentStepId}
          totalSteps={steps.length}
          isCurrentStepValid={steps[(customCurrentStepId ? customCurrentStepId : currentStepId) - 1].isValid}
          isLastStep={(customCurrentStepId ? customCurrentStepId : currentStepId) === steps.length}
          disabledLastStep={steps[(customCurrentStepId ? customCurrentStepId : currentStepId) - 1].disabledLastStep}
          textlastStep={textFinishButton}
          lastStephandler={handlerFinishButton}
        />
      </div>
    </div>,
    modalRoot
  );
};

export default ModalForm;
