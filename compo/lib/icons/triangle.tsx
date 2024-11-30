import React, { SVGProps } from 'react';



export const TriangleIcon = (props: SVGProps<SVGSVGElement>) => {
    return (

        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
            <path d="m16.707 13.293-4-4a1 1 0 0 0-1.414 0l-4 4A1 1 0 0 0 8 15h8a1 1 0 0 0 .707-1.707z" />
        </svg>
    );
}