import React, { SVGProps } from 'react'

const UnavailableIcon = (props:SVGProps<SVGSVGElement>) => (
    <svg width="16px" height="16px" viewBox="0 0 16 16" {...props}>
    <g id="icon16/unavailable" stroke="none">
        <path d="M8,0 C12.41875,0 16,3.58125 16,8 C16,12.41875 12.41875,16 8,16 C3.58125,16 0,12.41875 0,8 C0,3.58125 3.58125,0 8,0 Z M8,1.8 C4.57536255,1.8 1.8,4.57536255 1.8,8 C1.8,11.4246375 4.57536255,14.2 8,14.2 C11.4246375,14.2 14.2,11.4246375 14.2,8 C14.2,4.57536255 11.4246375,1.8 8,1.8 Z" id="primary"  fillRule="nonzero"></path>
        <path d="M11.6326232,9.25 L4.3657843,9.25 C4.16494373,9.25 4,9.06510417 4,8.83333333 L4,7.16666667 C4,6.93554688 4.16494373,6.75 4.36601149,6.75 L11.6339864,6.75 C11.834827,6.75 12,6.93554688 12,7.16666667 L12,8.83333333 C12.0006795,9.06510417 11.834827,9.25 11.6326232,9.25 Z" id="accent"  fillRule="nonzero"></path>
    </g>
</svg>
)

export default UnavailableIcon