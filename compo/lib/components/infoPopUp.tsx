import React from 'react';
import { InfoCirlceIcon } from '../icons/infoCirlce';
import { AnimatePresence, motion } from 'framer-motion';

interface infoPopUpProps {
  children: React.ReactNode;
}

const InfoPopUp = ({ children }: infoPopUpProps) => {
  const [showPopUp, setShowPopUp] = React.useState(false);

  const handleShowPopUpMouseEnter = () => {
    setShowPopUp(true);
  };

  const handleShowPopUpMouseLeave = () => {
    setShowPopUp(false);
  };

  const variants = {
    hidden: { scale: 0.95, opacity: 0, transition: { duration: 0.2 } },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.3 } },
    exit: { scale: 0.95, opacity: 0, transition: { duration: 0.2 } },
  };

  return (
    <div className="relative">
      <InfoCirlceIcon onMouseEnter={handleShowPopUpMouseEnter} onMouseLeave={handleShowPopUpMouseLeave} />
      <AnimatePresence>
        {showPopUp && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={variants}
            className="absolute bottom-5 z-50 w-[350px] rounded-sm bg-[#4A4D53] p-3 leading-5 text-white shadow-xl"
          >
            <p className="text-sm font-extralight">{children}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InfoPopUp;
