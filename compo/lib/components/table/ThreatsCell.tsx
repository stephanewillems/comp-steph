import React from 'react';
import { Threat } from '../../../components/ipa/IpaAnalyzer.types';
import CyberThreatTor from '../../icons/cyberthreatThor';
import CyberThreatVpn from '../../icons/cyberthreatVpn';
import CyberThreatCloudRelay from '../../icons/cyberThreatCloud';
import CyberThreatProxy from '../../icons/cyberThreatproxy';
import CyberThreatDataCenter from '../../icons/cyberThreatData';
import CyberThreatAnonymous from '../../icons/cyberthreatAnonymous';
import CyberThreatAttacker from '../../icons/cyberthreatAttacker';
import CyberThreatAbuser from '../../icons/cyberthreatAbuser';
import { useTranslation } from 'react-i18next';
import CyberThreatBogon from '../../icons/cyberthreatBogon';

interface ThreatsCellProps {
    value: Threat;
    showAllElements?: boolean
}

const iconMap = {
    isTor: { component: CyberThreatTor, title: 'ipa.tor' },
    isVPn: { component: CyberThreatVpn, title: 'ipa.vpn' },
    isCloudRelay: { component: CyberThreatCloudRelay, title: 'ipa.cloudRelay' },
    isProxy: { component: CyberThreatProxy, title: 'ipa.proxy' },
    isDataCenter: { component: CyberThreatDataCenter, title: 'ipa.dataCenter' },
    isAnonymous: { component: CyberThreatAnonymous, title: 'ipa.anonymous' },
    isKnownAttacker: { component: CyberThreatAttacker, title: 'ipa.knownAttacker' },
    isKnownAbuser: { component: CyberThreatAbuser, title: 'ipa.knownAbuser' },
    isBogon: { component: CyberThreatBogon, title: 'ipa.bogon' },
} as const;

type IconMapKey = keyof typeof iconMap;

const ThreatsCell = ({ value, showAllElements }: ThreatsCellProps) => {
    const { t } = useTranslation();
    return (
        <div className='flex flex-row items-center justify-start gap-4 w-max px-3'>
            {Object.keys(iconMap).map(key => {
                const iconKey = key as IconMapKey;
                const IconComponent = iconMap[iconKey].component;
                const title = iconMap[iconKey].title;
                if(showAllElements){
                    return (
                        <div key={key} title={t(`${title}`) + `: ${value[iconKey].toString()}`}>
                            <IconComponent className={`transition-all duration-75 ${ value[iconKey] ? `fill-primary` : `fill-arrowGrey`}`} />
                        </div>
                    );
                }
                return value[iconKey] && (
                    <div key={key} title={t(`${title}`)}>
                        <IconComponent className='transition-all duration-75 fill-arrowGrey hover:fill-primary' />
                    </div>
                );
            })}
        </div>
    );
};

export default ThreatsCell;
