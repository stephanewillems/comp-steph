import React, { SVGProps } from 'react'

interface SwatchIconProps extends SVGProps<SVGSVGElement> {
    fillPrimary?: string;
}

const SwatchIcon = ({fillPrimary,...props}: SwatchIconProps) => (
    <svg width="16px" height="16px" viewBox="0 0 16 16" {...props}>

    <g id="icon16/swatch" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <path d="M14,0 C15.1045695,-2.02906125e-16 16,0.8954305 16,2 L16,8 L8,16 L2,16 C0.8954305,16 1.3527075e-16,15.1045695 0,14 L0,2 C-1.3527075e-16,0.8954305 0.8954305,2.02906125e-16 2,0 L14,0 Z" id="Combined-Shape" fill={fillPrimary}></path>
        <path d="M16,8 L8,16 L14,16 C15.1045695,16 16,15.1045695 16,14 L16,8 L16,8 Z" id="Path-25" fill="#000000" opacity="0.30333746" className='mix-blend-multiply'  transform="translate(12, 12) scale(-1, -1) translate(-12, -12)"></path>
    </g>
</svg>
)

export default SwatchIcon