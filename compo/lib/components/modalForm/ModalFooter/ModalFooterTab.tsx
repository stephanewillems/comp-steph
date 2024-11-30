import React from 'react'
import { useTranslation } from 'react-i18next';


interface ModalFooterTabProps {
    textButton: string;
    onClick: () => void;
    onClose: () => void;
    isValidate?: boolean;
    loading?: boolean;
}



const ModalFooterTab = ({onClick,onClose,textButton,isValidate}:ModalFooterTabProps) => {
    const { t } = useTranslation();
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
          className={`rounded-xs flex h-[30px] flex-row items-center justify-start gap-3 bg-background-light px-2 font-medium shadow-xs hover:cursor-pointer hover:bg-background-light-hover 
      ${ !isValidate ? 'pointer-events-none bg-background-inactive text-light ' : 'text-primary'}`}
          onClick={onClick}
        >
          {t(`${textButton}`)}
        </button>
    </div>
    </div>
  </div>
  )
}

export default ModalFooterTab
