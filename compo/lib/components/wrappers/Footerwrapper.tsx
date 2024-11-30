import React from 'react'
interface FooterwrapperProps {
    children: React.ReactNode;
}

/* 
* Footerwrapper is a wrapper component that wraps the footer of the page
* @param {React.ReactNode} children - The children of the component
* @returns {React.ReactNode} - The Footerwrapper component
* @exports Footerwrapper
* 
* example usage:
* 
* import Footerwrapper from 'path/to/Footerwrapper'
* 
* const Component = () => {
*  return (
*   <Footerwrapper>
*      <div>Footer content</div>
*  </Footerwrapper>
*/


const Footerwrapper = ({ children }: FooterwrapperProps) => {
    return (
        <div className='w-full min-h-[70px] px-2.5 flex flex-row justify-start items-start pt-4 relative gap-3  z-50' style={{
            borderTop: '1px solid #A1A7B3'
        }}>
            {children}
        </div>
    )
}

export default Footerwrapper
