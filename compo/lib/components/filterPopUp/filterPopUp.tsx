import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface infoPopUpProps {
  children: React.ReactNode;
  iconNormal: string;
  iconActive: string;
  width: string;
  showPopUp: boolean;
  bgColor?: string;
  iconSizeClass? : string
}

const FilterPopUp = ({ children, iconNormal, iconActive, width, showPopUp, bgColor, iconSizeClass }: infoPopUpProps) => {

  const variants = {
    hidden: { scale: 0.95, opacity: 0, transition: { duration: 0.2 } },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.3 } },
    exit: { scale: 0.95, opacity: 0, transition: { duration: 0.2 } },
  };

  return (
    <div className="relative">
      <img src={showPopUp ? iconActive : iconNormal} className={iconSizeClass ? iconSizeClass : "h-5 w-5"} />
      <AnimatePresence>
        {showPopUp && (
          <motion.div
            initial="hidden"
            onClick={(e) => e.stopPropagation()}
            animate="visible"
            exit="hidden"
            variants={variants}
            className={`absolute bottom-8 z-50 ${width} h-auto rounded-md ${bgColor ? bgColor :'bg-[#FCFCFC]'} -ml-2.5 shadow-md h-[90px]`}
            style={{ border: '1px solid #D7E2F5' }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FilterPopUp;
