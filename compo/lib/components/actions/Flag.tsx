import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { cn } from '../../utils';
import { FlagFillIcon } from '../../icons/flag-fill';
import { FlagSlashIcon } from '../../icons/flag-slash';
import { FlagIcon } from '../../icons/flag-icon';

interface FlagProps {
    flagSize?: string;
    getFlagState?: (flag: number) => void;
    stateFlag: number;
}

/**
 * Flag action
 * @return {JSX.Element}
 * @flagSize {string} - Size of the flag
 * @author Jens & Stéphane
 */
function Flag({ flagSize, getFlagState,stateFlag }: FlagProps): JSX.Element {
    const { t } = useTranslation();

    const [flag, setFlag] = useState(stateFlag);
    const [flagFeedback, setFlagFeedback] = useState(t('feedback.flag.bad'));

    // Change feedback if flag state changes
    useEffect(() => {
        if (flag === 0) {
            setFlagFeedback(t('feedback.flag.bad'));
        } else if (flag === 1) {
            setFlagFeedback(t('feedback.flag.good'));
        } else {
            setFlagFeedback(t('feedback.flag.unknown'));
        }
    }, [flag]);

    // Change flag state and persist
    const handleFlag = () => {
        const newFlag = ((flag % 3) + 1) % 3;
        setFlag(newFlag);
        getFlagState && getFlagState(newFlag);
    };

    useEffect(() => {
        setFlag(stateFlag);
    }, [stateFlag]);

    return (
        <div
            className={cn(
                'h-4 w-4 transition-all hover:cursor-pointer',
                flag === 0 && 'fill-[#ADC3D9]',
                flag === 1 && 'fill-red-500',
                flag === 2 && 'fill-green-500'
            )}
            onClick={handleFlag}
            title={flagFeedback}
        >
            {flag === 0 && <FlagIcon className={flagSize} />}
            {flag === 1 && <FlagFillIcon className={flagSize} />}
            {flag === 2 && <FlagSlashIcon className={flagSize} />}
        </div>
    );
}

export { Flag };
