import React from 'react';
import FacebookIcon from '../../icons/facebook';
import TikTokIcon from '../../icons/tiktok';
import InstagramIcon from '../../icons/instragram';
import SnapChatIcon from '../../icons/snapchat';
import GmailIcon from '../../icons/gmail';
import RedlightsIcon from '../../icons/redlights';
import TweedeHandsIcon from '../../icons/tweedehands';
import RobloxIcon from '../../icons/robloxIcon';
import XIcon from '../../icons/xIcon';
import WhatsAppIcon from '../../icons/whatsAppIcon';

type SocMedPlatformName = string;

interface Props {
  width?: string;
  maxWidth?: string;
  className?: string;
  value: SocMedPlatformName | number | number[];
  fill: string;
}

interface SocMedPlatformIcon {
  name: SocMedPlatformName;
  icon: JSX.Element;
}

const socMedPlatformIcons: SocMedPlatformIcon[] = [
  { name: "facebook (meta)", icon: <FacebookIcon className='w-3.5' /> },
  { name: "instagram (meta)", icon: <InstagramIcon className='w-3.5' /> },
  { name: "tiktok", icon: <TikTokIcon className='w-3.5' /> },
  { name: "snapchat", icon: <SnapChatIcon className='w-3.5' /> },
  { name: "gmail (google)", icon: <GmailIcon className="w-3.5" /> },
  { name: "redlights", icon: <RedlightsIcon className="w-3.5" /> },
  { name: "tweedehands", icon: <TweedeHandsIcon className="w-3.5" /> },
  { name: "roblox", icon: <RobloxIcon /> },
  { name: "x (twitter)", icon: <XIcon className='w-3.5' /> },
  { name: "whatsapp (meta)", icon: <WhatsAppIcon className='w-3.5' /> }
];

const SocMedCell = ({ value, fill, className, maxWidth, width }: Props) => {

  let selectedIcons: SocMedPlatformIcon[] = [];

  if (typeof value === 'string') {
    const icon = socMedPlatformIcons.find(
      (platform) => platform.name === value.toLowerCase()
    );
    selectedIcons = icon ? [icon] : [];
  } else if (typeof value === 'number' && value > 0 && value <= socMedPlatformIcons.length) {
    selectedIcons = [socMedPlatformIcons[value - 1]];
  } else if (Array.isArray(value)) {
    selectedIcons = value.map(val => socMedPlatformIcons[val - 1]).filter(Boolean);
  }

  return (
    <div
      className={`font-inter flex flex-row items-center gap-3 pl-3 w-full ${className}`}
      style={{ width: width, maxWidth: maxWidth }}
    >
      {selectedIcons.map((socMedPlatformIcon, index) => {
        if (socMedPlatformIcon.name === "roblox") {
          return (
            <span key={index} className='' title={socMedPlatformIcon.name}>
              {React.cloneElement(socMedPlatformIcon.icon, { className: 'w-full mr-5 stroke-black fill-none' })}
            </span>
          )
        }
        return (
          <span key={index} className='' title={socMedPlatformIcon.name}>
            {React.cloneElement(socMedPlatformIcon.icon, { fill: fill, className: 'w-full mr-5' })}
          </span>
        )
      })}
    </div>
  );
};

export default SocMedCell;