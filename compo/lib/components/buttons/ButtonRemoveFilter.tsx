import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FilterCircleContourIcon } from '../../icons/filter-circle-contour';
import RedLine from '../../icons/redLine';

const ButtonRemoveFilter = () => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className="flex flex-col items-center justify-center gap-2">
            <motion.div
                className='relative h-8 w-8 rounded-sm flex items-center justify-center shadow-xs hover:cursor-pointer'
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
            >
                <motion.div
                    className='absolute'
                >
                    <RedLine isHovered={isHovered} />
                </motion.div>
                <FilterCircleContourIcon className='fill-primary' />
            </motion.div>
            <div className="font-inter text-[9px] font-bold uppercase text-light">Remove Filter</div>
        </div>
    );
}

export default ButtonRemoveFilter;