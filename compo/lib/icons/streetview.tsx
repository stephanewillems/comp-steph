import React from 'react';


interface StreetviewIconTypes {
    height?: string;
    width?: string;
    active?:number;
}

export const Streetview = ({height="16px",width="16px",active = 0}: StreetviewIconTypes) => {

    const fillColor = active === 0 ? "#005EBD" : "#fff"

return(

    <svg width={width} height={height} viewBox="0 0 16 16" version="1.1">
    <g id="icon16/google_streetview" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <path d="M6,9.5 L6.390625,12.6240625 C6.453125,13.096875 6.878125,13.5 7.38125,13.5 L8.615625,13.5 C9.12,13.5 9.5453125,13.124375 9.6078125,12.6240625 L10,9.5 C10.5521875,9.5 11,9.0521875 11,8.5 L11,7 C11,5.8953125 10.1046875,5 9,5 L7,5 C5.896875,5 5,5.896875 5,7 L5,8.5 C5,9.053125 5.446875,9.5 6,9.5 Z M8,4 C9.105625,4 10,3.105625 10,2 C10,0.894375 9.105625,0 8,0 C6.894375,0 6,0.894375 6,2 C6,3.105625 6.89375,4 8,4 Z" id="primary" fill={fillColor} fillRule="nonzero"></path>
        <path d="M11.5,10.746875 L11.5,12.1753125 C13.124375,12.350625 14.5,12.6771875 14.5,13.2490625 C14.5,14.2359375 10.415625,14.4990625 8,14.4990625 C5.5859375,14.4990625 1.5,14.235625 1.5,13.2490625 C1.5,12.633125 3.0840625,12.3246875 4.5,12.17125 L4.5,10.7396875 C2.6203125,11.015625 0,11.68125 0,13.25 C0,15.421875 5.028125,16 8,16 C10.971875,16 16,15.4209375 16,13.25 C16,11.825 13.83125,11.0875 11.5,10.746875 Z" id="accent" fill={fillColor} fillRule="nonzero"></path>
    </g>
</svg>
);
}