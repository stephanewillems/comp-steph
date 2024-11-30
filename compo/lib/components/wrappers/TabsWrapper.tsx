import React from 'react'
interface TabsWrapperProps {
  children: React.ReactNode;
}


/* 
* Creates the wrapper for the tabs
* other components can be passed as children
* they will be displayed in a row
* it has a border at the bottom
* 
*/
const TabsWrapper = ({ children }: TabsWrapperProps) => {
  return (
    <div className='w-full min-h-[56px] px-2.5 flex flex-row justify-start items-end relative gap-3' style={{
      borderBottom: '1px solid #A1A7B3'
    }}>
      {children}
    </div>
  )
}

export default TabsWrapper
