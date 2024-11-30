import React from 'react'

interface Props {
    className?: string;
    fill?: string;
    height?: string;
    width?: string;

    }


const LockIcon = ({className,fill,height,width}:Props) => {
  return (
    <svg width={width} height={height} viewBox="0 0 16 16" version="1.1" className={className}>
    <g id="icon16/lock-locked" stroke="none" strokeWidth="1"  fillRule="evenodd">
        <path d="M8.171875,1 C10.004871,1 11.5,2.44982207 11.5,4.25 L11.5,6 L12.5,6 C13.6045695,6 14.5,6.8954305 14.5,8 L14.5,14 C14.5,15.1045695 13.6045695,16 12.5,16 L3.5,16 C2.3954305,16 1.5,15.1045695 1.5,14 L1.5,8 C1.5,6.8954305 2.3954305,6 3.5,6 L4.5,6 L4.5,4.25 C4.5,2.44982207 5.99512901,1 7.828125,1 L8.171875,1 Z M12.5,7.5 L3.5,7.5 C3.22385763,7.5 3,7.72385763 3,8 L3,14 C3,14.2761424 3.22385763,14.5 3.5,14.5 L12.5,14.5 C12.7761424,14.5 13,14.2761424 13,14 L13,8 C13,7.72385763 12.7761424,7.5 12.5,7.5 Z M8,9.5 C8.41421356,9.5 8.75,9.83578644 8.75,10.25 L8.75,11.75 C8.75,12.1642136 8.41421356,12.5 8,12.5 C7.58578644,12.5 7.25,12.1642136 7.25,11.75 L7.25,10.25 C7.25,9.83578644 7.58578644,9.5 8,9.5 Z M8.171875,2.5 L7.828125,2.5 C6.81340275,2.5 6,3.28875418 6,4.25 L6,6 L10,6 L10,4.25 C10,3.28875418 9.18659725,2.5 8.171875,2.5 Z" id="primary"fill={fill} fillRule="nonzero"></path>
    </g>
</svg>
  )
}

export default LockIcon