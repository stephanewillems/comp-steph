import React from 'react';
import { useTranslation } from 'react-i18next';

const LoadingFailed = () => {
  const { t } = useTranslation();
  return (
    <div className="absolute z-50 flex items-center justify-center w-full h-full bg-[#FAFBFD] ">
    <div className="p-4 text-white bg-[#FAFBFD] rounded shadow w-full h-full">
    <div className="py-10 text-center">
      <div className="mb-4 text-gray-500">{t('lib.loadingFailed1')}</div>
      <p className="text-sm text-gray-600">{t('lib.loadingFailed2')}</p>
    </div>
    </div>
    </div>
  );
}

export default LoadingFailed;