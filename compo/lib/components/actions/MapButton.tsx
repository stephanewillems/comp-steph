import React, { useState, useEffect } from 'react';
import { MapIcon } from '../../icons/map';
import { useTranslation } from 'react-i18next';
import MapWithConfig from '../../../components/map/MapWithConfig';
import { createPortal } from 'react-dom';

interface Props {
  label: string;
  onClick?: () => void;
  activeState?: (active: boolean) => void;
  widthPanel?: string;
  portalId: string;
  border: 'left' | 'right' | 'top' | 'bottom' | 'all' | 'none';
  activeOnInit?: boolean;
}

const MapButton = ({ label, onClick, widthPanel, portalId, border, activeOnInit, activeState }: Props) => {
  const { t } = useTranslation();
  const [active, setActive] = useState(activeOnInit || false);
  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    // Check and set the portal container after the component mounts
    const container = document.getElementById(portalId);
    if (container) {
      setPortalContainer(container);
    } else {
      console.error(`Portal container with id "${portalId}" not found.`);
    }
  }, [portalId]);

  const activeColor = active ? 'bg-primary' : 'pg-highlight';
  const handleSwitch = () => {
    if (onClick) onClick();
    if (activeState) activeState(!active);
    setActive(!active);
  };

  const widthMapPanel = widthPanel ? widthPanel : 'w-full';

  const borderPanel = (border: string) => {
    switch (border) {
      case 'left':
        return 'borderLeft';
      case 'right':
        return 'borderRight';
      case 'top':
        return 'borderTop';
      case 'bottom':
        return 'borderBottom';
      case 'all':
        return 'border';
      case 'none':
        return '';
      default:
        return '';
    }
  };

  const borderStyle = '1px solid #B8BFCC';
  const borderProperty = borderPanel(border);

  const panelStyle = {
    [borderProperty]: borderStyle,
  };

  return (
    <>
      <div className="flex flex-col items-center ">
        <div>
          <button
            className={`items-centers flex h-9 w-9 justify-center rounded-[2px] border-[1px] border-solid border-slate-500/30 p-[2px] hover:shadow-md active:scale-95`}
            onClick={handleSwitch}
            data-te-toggle="tooltip"
            title={t('multiMap.heatMapTitle1')}
          >
            <div
              className={`flex h-full w-full items-center justify-center ${activeColor} transition-colors duration-150`}
            >
              <MapIcon className={`${active ? 'fill-white' : 'fill-primary'}`} />
            </div>
          </button>
        </div>
        <div className="mt-2 flex text-[9px] font-bold uppercase text-light">{t(`${label}`)}</div>
      </div>
      {active &&
        portalContainer &&
        createPortal(
          <div className={`${widthMapPanel}`} style={panelStyle}>
            <MapWithConfig heightFooter="" heightLayerMenu="" />
          </div>,
          portalContainer
        )}
    </>
  );
};

export default MapButton;
