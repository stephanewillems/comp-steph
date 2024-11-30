import React, { useEffect, useRef, useState } from 'react'
import ModalTabs from './ModalTabs/ModalTabs';
import { createPortal } from 'react-dom';
import ModalFooterTab from './ModalFooter/ModalFooterTab';
import MotionBorderTabSocMed from '../../../components/ipa/ipaSources/tabs/MotionBorderTabLocal';
import LoadingBar from '../loadingScreen/LoadingBar';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { CheckmarkIcon } from '../../icons/checkmark';
import { XmarkCircleFillIcon } from '../../icons/xmark-circle-fill';
import { Button } from '../buttons/Button';


type LoadingType = 'none' | 'loading' | 'loaded' | 'failed';

export interface Tab {
  id: number;
  icon: JSX.Element;
  title: string;
  component: JSX.Element;
  isValid: () => boolean;
  disabled?: boolean;
}

interface ModalFormTabsProps {
  isOpen: boolean;
  onClose: () => void;
  onRefresh: () => void;
  onConfirm: (tabId: number) => void;
  tabs: Tab[];
  loading: LoadingType;
  activeTab?: number;
}

const modalRoot = document.getElementById('modal-root') || document.body;


const ModalFormTabs = ({ isOpen, onClose, tabs, onConfirm, loading, onRefresh, activeTab  }: ModalFormTabsProps) => {
  const { t } = useTranslation();
  const [currentTabId, setCurrentTabId] = useState(activeTab || 0);
  const tabsRefUpload = useRef<HTMLDivElement[]>([]);
  const [tabsWidth, setTabsWidth] = useState<number[]>([]);

  const calculateTabWidths = () => {
    const widths = tabsRefUpload.current.map(tab => tab?.offsetWidth + 10 || 0);
    setTabsWidth(widths);
  };

  useEffect(() => {
    calculateTabWidths();
  }, [activeTab]);

  useEffect(() => {
    if (activeTab !== undefined && activeTab !== currentTabId) {
      setCurrentTabId(activeTab);
    }
  }, [activeTab]);

  useEffect(() => {
    calculateTabWidths();
  }, [currentTabId]);

  const handleClose = () => {
    onClose();
  };

  const handleRefresh = () => {
    onRefresh();
    onClose();
  };

  const handleConfirm = () => {
    onConfirm(currentTabId);
  };


  if (!isOpen) return null;
  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center h-full bg-black bg-opacity-40 backdrop-filter backdrop-blur-sm">
      <div className=" relative z-40 bg-white rounded-lg w-[80%] h-[80%] grid grid-rows-[80px_2fr_80px]">
        <div className="relative z-50 flex items-center " style={{
          borderBottom: '1px solid #A1A7B3'
        }}>
          <ModalTabs setCurrentTabId={setCurrentTabId} currentTabId={currentTabId} tabs={tabs} tabsRef={tabsRefUpload} />
          <MotionBorderTabSocMed tabsWidth={tabsWidth} tabsRef={tabsRefUpload} activeTab={currentTabId} />
        </div>
        <div className='w-full h-full p-10 pt-0'>
          {tabs.map((tab) => (
            <div key={tab.id} className={`h-full ${currentTabId === tab.id ? '' : 'hidden'}`} >
              {tab.component}
            </div>
          ))}
        </div>
        {loading === "loading" && <div className="absolute inset-0 z-50 flex items-center justify-center bg-white bg-opacity-60">
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 border-t-2 border-b-2 rounded-full animate-spin border-primary"></div>
            <p className="py-2 mt-5 text-primary">Processing...</p>
            <LoadingBar />
          </div>
        </div>
        }

        {
          loading === "loaded" && <div className="absolute inset-0 z-50 flex items-center justify-center bg-white bg-opacity-60">
            <div className="flex flex-col items-center gap-2">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                className="flex flex-row items-center gap-2"
              >
                <CheckmarkIcon className="w-full h-full fill-green-500" width="25px" height="25px" />
              </motion.div>
              <p>
                {t('ipa.uploadingFinishedText1')}
              </p>
              <p> {t('ipa.uploadingFinishedText2')}</p>
              <Button variant='primary' className='rounded-[2px]' onClick={handleRefresh}>{t('ipa.sluiten')}</Button>
            </div>
          </div>
        }
        {
          loading === "failed" && <div className="absolute inset-0 z-50 flex items-center justify-center bg-white bg-opacity-60">
            <div className="flex flex-col items-center gap-2">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                className="flex flex-row items-center gap-2"
              >
                <XmarkCircleFillIcon className="w-full h-full fill-red-500" width="25px" height="25px" />
              </motion.div>
              <p>{t('ipa.uploadingFailedText1')}</p>
              <Button variant='primary' onClick={handleClose}>{t('ipa.button.sluiten')}</Button>
            </div>
          </div>
        }

        <ModalFooterTab textButton='ipa.button.uploading' onClick={handleConfirm} onClose={handleClose} isValidate={tabs[currentTabId].isValid()} />
      </div>
    </div>,
    modalRoot
  );
}

export default ModalFormTabs
