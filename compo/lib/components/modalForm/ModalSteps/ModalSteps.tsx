import React, { Fragment } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

interface Step {
  id: number;
  title: string;
}

interface ModalProps {
  steps: Step[];
  currentStepId: number; 
}

const ModalSteps = ({ steps, currentStepId }: ModalProps) => {

  const { t } = useTranslation();
  
  // Function to determine the status of each step
  const getStepStatus = (stepId: number) => {
    if (stepId < currentStepId) return 'done';
    if (stepId === currentStepId) return 'current';
    if (stepId > currentStepId) return 'next';
    return 'default';
  };

  // StatusColor function for background color of steps
  const statusColor = (status: string) => {
    switch (status) {
      case 'done':
        return 'bg-primary-info text-white';
      case 'current':
        return 'bg-primary text-white';
      case 'next':
        return 'bg-white text-primary-dark';
      default:
        return 'bg-white text-primary';
    }
  };
  // TextColor function for text below steps
  const textColor  = (status: string) => {
    switch (status) {
      case 'done':
        return 'text-primary-info font-medium';
      case 'current':
        return 'text-primary font-semibold';
      case 'next':
        return 'text-primary-dark font-medium';
      default:
        return 'text-primary';
    }
  }
  return (
    <>
      <div className="relative flex flex-row items-center justify-between w-full h-24 px-16 ">
        {steps.map((step) => {
          const stepStatus = getStepStatus(step.id);
          return (
            <Fragment key={step.id}>
              <div className={`relative flex flex-col items-center  gap-3 `}>
                <motion.div
                  className={`
                flex h-9 w-9 items-center justify-center rounded-full pt-[1px] text-lg font-medium z-50
                ${statusColor(stepStatus)}
                `}
                  style={{ border: stepStatus !== 'done' ? '2px solid #B2D5F7' : 'none' }}
                  animate={{ opacity: 1, scale: 1 }}
                  initial={{ opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.2 }}
                >
                   {
                   stepStatus === 'done' ? 
                   <motion.span 
                   initial={{ scale: 0 }} 
                   animate={{ scale: 1 }} 
                   exit={{ scale: 0 }}
                    transition={{  ease: "linear",
                    duration: 0.2,
                    x: { duration: 0.1 }}}
                    >
                    &#10003;
                    </motion.span> 
                    : step.id
                    }
                </motion.div>
                <div className={`absolute text-center break-words w-36 top-12 ${textColor(stepStatus)}`}>{t(`${step.title}`)}</div>
              </div>
            </Fragment>
          );
        })}
        <div className="absolute bg-lightBlue z-40 ml-2 top-[40px] w-[calc(100%-150px)] h-[2px]"></div>
      </div>
    </>
  );
};

export default ModalSteps;
