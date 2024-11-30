import React from 'react';
import { useTranslation } from 'react-i18next';

interface ModalFooterProps {
  onClose: () => void;
  onNextClick: () => void;
  onPrevClick: () => void;
  currentStepId: number;
  totalSteps: number;
  isCurrentStepValid: () => boolean;
  isLastStep?: boolean;
  disabledLastStep?: () => boolean;
  textlastStep?: string;
  lastStephandler?: () => void;
}

const ModalFooter = ({
  onClose,
  onNextClick,
  onPrevClick,
  currentStepId,
  totalSteps,
  isCurrentStepValid,
  isLastStep,
  disabledLastStep,
  textlastStep,
  lastStephandler
}: ModalFooterProps) => {
  const { t } = useTranslation();
  const disabledPrev = currentStepId === 1 ? true : false;
  const disabledNext = currentStepId === totalSteps ? true : false;
  const isValidate = isCurrentStepValid();
  const disabledLastStepButton = disabledLastStep ? disabledLastStep() : false;


  const handleClose = () => {
    lastStephandler && lastStephandler();
    onClose();
  }

  return (
    <div className="flex flex-col justify-center shadow-top">
      <div className="flex flex-row items-center justify-between px-10">
        <button
          type="button"
          onClick={onClose}
          className="text-base font-medium tracking-[-0.25px] text-primary hover:underline">
          {t('lib.annuleer')}
        </button>
        <div className="flex flex-row gap-6 ">
          <button
            type="button"
            className={`rounded-xs flex h-[30px] flex-row items-center justify-start  gap-3 bg-background-light px-2 font-medium shadow-xs hover:cursor-pointer hover:bg-background-light-hover
        ${disabledPrev ? 'pointer-events-none bg-background-inactive text-light hidden ' : 'text-primary block'}`}
            onClick={onPrevClick}>
            {t('lib.prev')}
          </button>


          {isLastStep && isLastStep === true ? (
            <button
              type="button"
              className={`rounded-xs flex h-[30px] flex-row items-center justify-start gap-3 bg-background-light px-2 font-medium shadow-xs hover:cursor-pointer hover:bg-background-light-hover 
        ${disabledLastStepButton ? 'pointer-events-none bg-background-inactive text-light ' : 'text-primary'}`}
              onClick={handleClose}>
              {textlastStep ? t(`${textlastStep}`) : t('lib.finish')}
            </button>
          ) : (
            <button
              type="button"
              className={`rounded-xs flex h-[30px] flex-row items-center justify-start gap-3 bg-background-light px-2 font-medium shadow-xs hover:cursor-pointer hover:bg-background-light-hover 
        ${disabledNext || !isValidate ? 'pointer-events-none bg-background-inactive text-light ' : 'text-primary'}`}
              onClick={onNextClick}
            >
              {t('lib.next')}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModalFooter;
