import React from 'react';
import { SVGProps } from 'react';

export const InternetIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg width="16px" height="16px" viewBox="0 0 16 16" {...props}>
    <path d="M7.99215686,0 C9.08496732,0 10.1150327,0.209150327 11.0823529,0.62745098 C12.0496732,1.04575163 12.9019608,1.62352941 13.6392157,2.36078431 C14.3764706,3.09803922 14.9542484,3.94901961 15.372549,4.91372549 C15.7908497,5.87843137 16,6.90718954 16,8 C16,9.09281046 15.7908497,10.1215686 15.372549,11.0862745 C14.9542484,12.0509804 14.3764706,12.9019608 13.6392157,13.6392157 C12.9019608,14.3764706 12.0509804,14.9542484 11.0862745,15.372549 C10.1215686,15.7908497 9.09281046,16 8,16 C6.90718954,16 5.87843137,15.7908497 4.91372549,15.372549 C3.94901961,14.9542484 3.09803922,14.3764706 2.36078431,13.6392157 C1.62352941,12.9019608 1.04575163,12.0509804 0.62745098,11.0862745 C0.209150327,10.1215686 0,9.09281046 0,8 C0,6.90718954 0.209150327,5.87843137 0.62745098,4.91372549 C1.04575163,3.94901961 1.62222222,3.09803922 2.35686275,2.36078431 C3.09150327,1.62352941 3.94117647,1.04575163 4.90588235,0.62745098 C5.87058824,0.209150327 6.89934641,0 7.99215686,0 Z M4.6414359,11.5683936 L4.64784314,11.6483137 C4.6854902,12.0542745 4.74666667,12.4564706 4.83137255,12.854902 C4.9400601,13.366136 5.08438712,13.8680727 5.26435363,14.3607123 L5.3254902,14.3882353 C6.1620915,14.751634 7.05359477,14.9333333 8,14.9333333 C8.39843098,14.9333333 8.78713137,14.9011297 9.16610114,14.8367223 C8.79584155,14.2492354 8.47663268,13.6403234 8.20653595,13.0082789 L8.12204882,13.0044818 C7.83937575,12.9753501 7.59607843,12.8588235 7.39215686,12.654902 C7.24784314,12.5105882 7.14729929,12.347516 7.09052532,12.1656852 C6.25696566,12.0454842 5.44031212,11.8461046 4.6414359,11.5683936 Z M13.0463366,11.6685437 L13.0339385,11.6727185 C12.4852417,11.8514 11.9262164,11.9918664 11.3568627,12.0941176 C10.7163399,12.2091503 10.0748366,12.2771242 9.43235294,12.2980392 L9.37556143,12.3002321 C9.31661071,12.4289152 9.23325363,12.5471385 9.1254902,12.654902 C9.1190165,12.6613757 9.11250698,12.6677613 9.10596166,12.6740588 C9.44445224,13.4643321 9.86620673,14.2149237 10.3686275,14.9254902 L10.1421496,14.592482 C10.3220067,14.5323548 10.4994601,14.4642725 10.6745098,14.3882353 C11.5111111,14.0248366 12.248366,13.524183 12.8862745,12.8862745 C13.1427864,12.6297626 13.3771048,12.3571868 13.5892297,12.0685471 C13.4015563,11.941446 13.2212399,11.8078987 13.0463366,11.6685437 Z M1.31920658,9.85298515 L1.37328431,10.0367647 C1.44142157,10.2527778 1.52091503,10.4653595 1.61176471,10.6745098 C1.9751634,11.5111111 2.47581699,12.248366 3.11372549,12.8862745 C3.40424356,13.1767926 3.71536706,13.4388426 4.04709599,13.6724246 C3.96316035,13.3543556 3.89248869,13.0351045 3.83529412,12.7137255 C3.7254902,12.096732 3.66535948,11.4745098 3.65490196,10.8470588 L3.6670974,11.1869785 C2.84045487,10.8259993 2.0578246,10.3813349 1.31920658,9.85298515 Z M9.55971911,7.89202404 L9.2588848,7.91102941 L8.83137255,7.92156863 C8.5866776,7.92156863 8.34373922,7.91345491 8.10255743,7.89722748 C8.10645752,8.80729063 8.20965311,9.6997928 8.41169133,10.5730571 C8.68568483,10.6028645 8.92309043,10.7191689 9.1254902,10.9215686 C9.25376344,11.0498419 9.34745611,11.1929354 9.4065682,11.3508491 C10.0745157,11.3296789 10.7436868,11.2515387 11.4117647,11.1176471 C11.6838085,11.0631259 11.9529521,10.9992394 12.2191955,10.9259877 C12.022262,10.7265045 11.834341,10.5187829 11.654902,10.3019608 C11.1851852,9.73438635 10.7881203,9.12443163 10.4637073,8.47209665 C10.1852085,8.44310903 9.943804,8.32644757 9.74117647,8.12156863 C9.66989278,8.0494929 9.609407,7.97297804 9.55971911,7.89202404 Z M5.52144341,7.39194947 L5.45490196,7.46666667 C5.26986202,7.65374001 5.05556362,7.76806262 4.81200678,7.80963447 C4.61502077,8.79261714 4.54596211,9.80052224 4.60392157,10.8313725 L4.59223563,10.5382575 C5.4305795,10.8603049 6.28986359,11.087804 7.1700879,11.2207549 C7.22613898,11.1129321 7.30027695,11.0134485 7.39215686,10.9215686 C7.42517274,10.8885528 7.45922077,10.8578278 7.49430097,10.8293937 C7.26629022,9.85640533 7.15294118,8.85815406 7.15294118,7.83529412 C7.15294118,7.81991036 7.15296728,7.80453127 7.15301949,7.78915686 C6.76786114,7.72852917 6.38748553,7.64560317 6.01176471,7.54117647 C5.8465236,7.49524986 5.68308316,7.44550752 5.52144341,7.39194947 Z M14.6572658,6.06286997 L14.3870098,6.24803922 C13.6904412,6.70882353 12.9431373,7.07843137 12.145098,7.35686275 C12.0256907,7.3985233 11.905773,7.43787922 11.785345,7.47493049 C11.7468787,7.72020611 11.634851,7.93565506 11.4509804,8.12156863 C11.4294417,8.14334666 11.4075086,8.16412792 11.3851813,8.1839124 C11.6797516,8.75551756 12.0382979,9.29047023 12.4588235,9.78823529 C12.7010284,10.0749268 12.9602422,10.343301 13.2364649,10.5933579 C13.8474979,10.3650579 14.4416193,10.0830864 15.0196078,9.74901961 L14.651885,9.95510002 C14.8395172,9.33174732 14.9333333,8.68004732 14.9333333,8 C14.9333333,7.32648462 14.8413108,6.68077461 14.6572658,6.06286997 Z M1.70719422,5.11716818 L1.61176471,5.3254902 C1.24836601,6.1620915 1.06666667,7.05359477 1.06666667,8 C1.06666667,8.15477953 1.07152655,8.3080906 1.08124633,8.45993322 C1.95112161,9.19703899 2.894858,9.79484065 3.91372549,10.254902 L3.63739013,10.1243339 C3.63958766,9.27136008 3.72348721,8.43299528 3.88908876,7.60923944 C3.83108563,7.56859587 3.77497666,7.5206616 3.72156863,7.46666667 C3.48366013,7.22614379 3.36470588,6.93594771 3.36470588,6.59607843 C3.36470588,6.52646235 3.36969674,6.45898521 3.37967846,6.393647 C2.77911448,6.02582007 2.2212877,5.59966134 1.70719422,5.11716818 Z M9.83432083,1.57613833 L9.66519608,1.86127451 C9.22696078,2.63088235 8.87843137,3.44313725 8.61960784,4.29803922 C8.35878015,5.15956099 8.19652022,6.04348453 8.13282806,6.94980984 C8.36366687,6.96603674 8.59645692,6.97343216 8.83137255,6.97254902 C9.03235294,6.97156863 9.23186275,6.96438419 9.42990196,6.95099571 C9.48009441,6.74972217 9.5845805,6.57228225 9.74117647,6.41568627 L9.72432868,6.43325396 C9.56271715,5.75227609 9.47682982,5.05099536 9.46666667,4.32941176 C9.46143791,3.72810458 9.50849673,3.13856209 9.60784314,2.56078431 C9.66509959,2.22779286 9.74059215,1.89957753 9.83432083,1.57613833 Z M8.66483722,1.09813599 L8.41587993,1.32335996 C7.69243928,2.00161381 7.06230937,2.75657226 6.5254902,3.58823529 C6.08962825,4.26349111 5.72518502,4.97054651 5.43216052,5.70940148 L5.45490196,5.72941176 C5.69281046,5.96732026 5.81176471,6.25620915 5.81176471,6.59607843 L5.80565027,6.48716417 C6.25787948,6.6404987 6.71943509,6.75750938 7.19031708,6.83819623 C7.25856384,5.92345338 7.42132458,5.0277876 7.67843137,4.14901961 C8.02875817,2.95163399 8.53856209,1.82745098 9.20784314,0.776470588 L8.98700133,1.13645902 C8.8803719,1.12117404 8.77298386,1.1083997 8.66483722,1.09813599 Z M10.7963017,1.67121997 C10.6921345,2.00326974 10.6097072,2.34292844 10.5490196,2.69019608 C10.454902,3.22875817 10.4104575,3.77254902 10.4156863,4.32156863 C10.4248222,4.91845148 10.4911584,5.4993715 10.6146946,6.06432869 C10.9408698,6.0659098 11.21883,6.18353586 11.4509804,6.41568627 C11.4935369,6.45824275 11.5322448,6.50233861 11.5671043,6.54797388 L11.9215686,6.42745098 C12.7815835,6.11575246 13.5742792,5.68426543 14.2996558,5.1329899 C13.9456114,4.37437295 13.4728674,3.70182964 12.8823529,3.11372549 C12.2418301,2.47581699 11.503268,1.9751634 10.6666667,1.61176471 Z M7.29412061,1.09997281 C6.60343137,1.16887255 5.94509804,1.33921569 5.31764706,1.61176471 C4.48104575,1.9751634 3.74509804,2.47581699 3.10980392,3.11372549 C2.76530947,3.45963762 2.46078985,3.83476212 2.19624507,4.23909901 C2.70852647,4.75755743 3.27434527,5.20646032 3.89366576,5.58762005 C4.09538084,5.44338576 4.32977191,5.37254902 4.59607843,5.37254902 L4.55066683,5.37370939 C4.82573426,4.6773759 5.15982571,4.00640087 5.55294118,3.36078431 C6.05064081,2.54340837 6.63103396,1.78980453 7.29412061,1.09997281 Z" />
  </svg>
);
