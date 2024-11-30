import React from 'react';
import { SVGProps } from 'react';

export const PlayIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg width="16px" height="16px" viewBox="0 0 16 16" {...props}>
    <path
      transform="translate(8, 8) rotate(-270) translate(-8, -8)"
      d="M8.8637789,3.48076383 L14.1227419,12.496129 C14.4010222,12.9731809 14.2398859,13.5854986 13.762834,13.8637789 C13.609898,13.9529916 13.4360176,14 13.258963,14 L2.741037,14 C2.18875225,14 1.741037,13.5522847 1.741037,13 C1.741037,12.8229454 1.7880454,12.649065 1.8772581,12.496129 L7.1362211,3.48076383 C7.41450138,3.00371192 8.02681911,2.84257567 8.50387103,3.12085595 C8.65287466,3.20777474 8.77686011,3.3317602 8.8637789,3.48076383 Z"
    />
  </svg>
);
