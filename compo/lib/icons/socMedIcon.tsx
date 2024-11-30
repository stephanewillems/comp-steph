import React, { SVGProps } from 'react'


interface SocMediaIconProps extends SVGProps<SVGSVGElement>{
  fill?: string;
  fillAccent?: string;
}

const SocMediaIcon = ({fill,fillAccent,...props}:SocMediaIconProps) =>{
  
  fill = fill ? fill : '#0073e6';
  fillAccent = fillAccent ? fillAccent : '#3af';
  
  
  return(
    <svg  width="15.996" height="12" viewBox="0 0 15.996 12" {...props}>
  <path id="primary" d="M3.6,7.333a1.346,1.346,0,0,1,.164.01l0,.02-.742,3.123a2.671,2.671,0,0,0,.079.847H1.34A1.34,1.34,0,0,1,.04,9.667l.332-1.32a1.34,1.34,0,0,1,1.3-1.014Zm10.721,0a1.34,1.34,0,0,1,1.3,1.014l.332,1.32a1.34,1.34,0,0,1-1.3,1.667H12.9a2.641,2.641,0,0,0,0-1.313l-.67-2.667,0-.01a1.347,1.347,0,0,1,.163-.01Zm-11.687-5a2,2,0,1,1-2.01,2A2.005,2.005,0,0,1,2.637,2.333Zm10.721,0a2,2,0,1,1-2.01,2A2.005,2.005,0,0,1,13.358,2.333Z" fill={fill}/>
  <path id="accent" d="M6.364,6.667H9.632a1.339,1.339,0,0,1,1.3,1.01l.67,2.667a1.333,1.333,0,0,1-.975,1.617A1.349,1.349,0,0,1,10.3,12H5.694a1.333,1.333,0,0,1-1.3-1.657l.67-2.667A1.339,1.339,0,0,1,6.364,6.667ZM8,5.333a2.667,2.667,0,1,0-2.68-2.667A2.674,2.674,0,0,0,8,5.333Z" fill={fillAccent}/>
</svg>

)}

export default SocMediaIcon
