import React, { useEffect } from 'react'
import { motion } from 'framer-motion'

interface MotionBorderTabsProps {
  tabsRef: React.MutableRefObject<HTMLDivElement[]>;
  activeTab: number;
}

/* 
 * Component for rendering motion border tabs
  * @param tabsRef - reference to tabs
  * @param activeTab - active tab
  * @returns - returns motion border tabs
  * @example
  * <MotionBorderTabs tabsRef={tabsRef} activeTab={activeTab} />
 */


const MotionBorderTabs = ({ tabsRef,  activeTab }: MotionBorderTabsProps) => {
    const [tabsWidth, setTabsWidth] = React.useState<number[]>([]);

    useEffect(() => {
        const widths = tabsRef.current.map(tab => tab?.offsetWidth || 0);
        setTabsWidth(widths);
    }, [])

  return (
    <motion.div
      className='absolute bottom-0 h-[1.5px] bg-primary'
      initial={false}
      animate={{ x: tabsRef.current[activeTab]?.offsetLeft - 2 || 0, width: tabsWidth[activeTab] || 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    />
  )
}

export default MotionBorderTabs
