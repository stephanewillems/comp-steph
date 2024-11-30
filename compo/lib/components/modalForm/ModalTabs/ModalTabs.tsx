import React from 'react'
import { Tab } from '../ModalFormTabs';


interface ModalTabsProps {
  setCurrentTabId: React.Dispatch<React.SetStateAction<number>>;
  tabsRef: React.MutableRefObject<HTMLDivElement[]>;
  currentTabId: number;
  tabs: Tab[];
}

const ModalTabs = ({ setCurrentTabId, currentTabId, tabs, tabsRef }: ModalTabsProps) => {


  const handleClick = (disabled: boolean,index:number) => {
    if (disabled) return;
    setCurrentTabId(index)
  }
  return (
    <div className='flex flex-row items-end justify-start w-full h-full px-14'>
      {
        tabs.map((tab: Tab, index: number) => (
          <div
            key={tab.id}
            ref={el => tabsRef.current[index] = el as HTMLDivElement}
            className={`flex flex-row items-end justify-center h-10 gap-2 px-5 pb-3 cursor-pointer `}
            onClick={() => handleClick(tab.disabled || false,index)}
            
          >
            {currentTabId === tab.id
              ? React.cloneElement(tab.icon, { className: 'fill-primary' })
              : React.cloneElement(tab.icon, { className: 'fill-primary-info' })
            }
            <div className={`text-[14px] font-[600] leading-none font-inter ${currentTabId === index ? 'text-primary' : 'text-primary-info'} ${tab.disabled ? 'cursor-not-allowed': ''}`} >{tab.title}</div>

          </div>
        ))}
    </div>
  )
}

export default ModalTabs
