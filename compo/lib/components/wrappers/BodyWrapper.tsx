import React from 'react'

interface BodyWrapperProps {
    children: React.ReactNode;
    noPadding?: boolean;
    noGap?: boolean;
}

/* 
* BodyWrapper is a wrapper component that wraps the body of the page
* @param {React.ReactNode} children - The children of the component
* @param {boolean} noPadding - If true, the component will have no padding
* @param {boolean} noGap - If true, the component will have no gap
* @returns {React.ReactNode} - The BodyWrapper component
* @exports BodyWrapper
* 
* example usage:
* 
* import BodyWrapper from 'path/to/BodyWrapper'
* 
* const Component = () => {
* return (
*  <BodyWrapper>
*     <div>Body content</div>
* </BodyWrapper>
* )
 */

const BodyWrapper = ({children,noGap,noPadding}:BodyWrapperProps) => {
  const padding = noPadding ? 'p-0' : 'px-4 py-2';
  const gap = noGap ? '' : 'gap-4';
  return (
    <div className={`w-full h-full overflow-y-auto max-h-[calc(100vh-222px)] flex flex-col ${padding} ${gap}`}>
      {children}
    </div>
  )
}

export default BodyWrapper