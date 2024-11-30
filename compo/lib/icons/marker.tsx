
import React from 'react';


interface MarkerDefaultIconTypes {
    height?: string;
    width?: string;
    fill?: string;
    className?: string;
    children: React.ReactNode;
}

/* Default Marker Icon */
export const MarkerDefaultIcon2 = ({ height = "25px", width = "25px", fill = "white", className = "", children }: MarkerDefaultIconTypes): JSX.Element => {

    return (
        <div className='relative flex flex-col items-center justify-center '>
            <svg width={width} height={height} viewBox="0 0 24 30" className={className}  >
                <circle cx="12" cy="12" r="10" fill="white" stroke="#FFF" strokeWidth="1" />
                <path d="M12,0 C18.627417,0 24,5.372583 24,12 C24,18.627417 18.7194093,23.0282075 12,30 C5.41228498,23.0074323 0,18.627417 0,12 C0,5.372583 5.372583,0 12,0 Z M12,2.25 C6.61522369,2.25 2.25,6.61522369 2.25,12 C2.25,17.3847763 6.61522369,21.75 12,21.75 C17.3847763,21.75 21.75,17.3847763 21.75,12 C21.75,6.61522369 17.3847763,2.25 12,2.25 Z" fill={fill} fillRule="evenodd" />

            </svg>
             <div>
            <svg width="32px" height="10px" viewBox="0 0 32 10" version="1.1">
    <defs>
        <path d="M12,2.5 C18.627417,2.5 24,1.72137876 24,1.29226498 C24,0.863151208 18.627417,1.03327191 12,1.03327191 C5.372583,1.03327191 0,0.863151208 0,1.29226498 C0,1.72137876 5.372583,2.5 12,2.5 Z" id="path-1"></path>
        <filter x="-25.0%" y="-400.0%" width="150.0%" height="900.0%" filterUnits="objectBoundingBox" id="filter-2">
            <feOffset dx="0" dy="0" in="SourceAlpha" result="shadowOffsetOuter1"></feOffset>
            <feGaussianBlur stdDeviation="2" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur>
            <feColorMatrix values="0 0 0 0 0.2   0 0 0 0 0.2   0 0 0 0 0.2  0 0 0 0.6 0" type="matrix" in="shadowBlurOuter1"></feColorMatrix>
        </filter>
        <path d="M12,3 C18.627417,3 24,1.44275752 24,0.584529966 C24,-0.273697584 18.627417,0.0665438183 12,0.0665438183 C5.372583,0.0665438183 0,-0.273697584 0,0.584529966 C0,1.44275752 5.372583,3 12,3 Z" id="path-3"></path>
        <filter x="-6.2%" y="-50.0%" width="112.5%" height="200.0%" filterUnits="objectBoundingBox" id="filter-4">
            <feMorphology radius="0.5" operator="erode" in="SourceAlpha" result="shadowSpreadOuter1"></feMorphology>
            <feOffset dx="0" dy="0" in="shadowSpreadOuter1" result="shadowOffsetOuter1"></feOffset>
            <feGaussianBlur stdDeviation="1" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur>
            <feColorMatrix values="0 0 0 0 0.2   0 0 0 0 0.2   0 0 0 0 0.2  0 0 0 0.6 0" type="matrix" in="shadowBlurOuter1"></feColorMatrix>
        </filter>
    </defs>
    <g  stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" fillOpacity="1">
        <g  transform="translate(4.000000, -30.000000)" fill="black">
            <g id="map/marker/shadow" transform="translate(0.000000, 29.000000)">
                <g id="Oval-Copy" opacity="0.69715518" style={{mixBlendMode:'multiply'}}>
                    <use filter="url(#filter-2)" xlinkHref="#path-1"></use>
                </g>
                <g id="Oval" opacity="0.797783261" style={{mixBlendMode:'multiply'}}>
                    <use filter="url(#filter-4)" xlinkHref="#path-3"></use>
                </g>
            </g>
        </g>
    </g>
</svg>
             </div>
           
            <div className='absolute top-[5px]'>
                {children}
            </div>
        </div>
    );
}

