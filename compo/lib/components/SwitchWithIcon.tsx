import React, { useEffect, useState } from 'react'


interface Props {
    checked:boolean;
    /* https://tanstack.com/table/v8/docs/api/features/column-visibility#gettogglevisibilityhandler */
    onChange: (event:unknown) => void; 
}

const SwitchWithIcon = ({checked,onChange}:Props) => {

const [enabled, setEnabled] = useState(checked);

    useEffect(()=>{
        setEnabled(checked)
    },[checked])

  return (
    <>  
      <button type="button" className={`relative inline-flex flex-shrink-0 h-4 transition-colors duration-200 ease-in-out  border-2 border-transparent rounded-full cursor-pointer w-9  ${enabled ? 'bg-primary': 'bg-gray-200'}`} role="switch" aria-checked="false" onClick={onChange}>
        <span className={`relative inline-block w-4 h-4 transition duration-200 ease-in-out transform  bg-white rounded-full shadow pointer-events-none ring-0  ${enabled ? 'translate-x-5': 'translate-x-0'}`}>

          <span className={`absolute inset-0 flex items-center justify-center w-full h-full transition-opacity ${enabled ? 'opacity-0 duration-100 ease-out': 'opacity-100 duration-200 ease-in'}`} aria-hidden="true">
            <svg className="w-3 h-3 text-gray-400" fill="none" viewBox="0 0 12 12">
              <path d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>

          <span className={`absolute inset-0 flex items-center justify-center w-full h-full transition-opacity ${enabled ? 'opacity-100 duration-200 ease-in':'opacity-0 duration-100 ease-out'}`} aria-hidden="true">
            <svg className="w-3 h-3 text-indigo-600" fill="currentColor" viewBox="0 0 12 12">
              <path d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z" />
            </svg>
          </span>
        </span>
      </button>

    </>
  )
}

export default SwitchWithIcon
