import React, { useState } from 'react';
import { LayoutGroup, motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export interface TabsProps {
  text: string;
  value: string;
  onClick: (item: number) => void;
  icon?: JSX.Element;
  activeIcon?: JSX.Element;
}

interface TabbuttonsProps {
  tabs: TabsProps[];
}

const ButtonTabs = ({ tabs }: TabbuttonsProps) => {
  const { t } = useTranslation();
  const [selectedTab, setSelectedTab] = useState(tabs[0].value);

  const handleTabClick = (value: string) => {
    setSelectedTab(value);
  };

  return (
    <div className="flex items-center justify-center h-full">
      <LayoutGroup>
        <div
          className="flex w-full flex-row items-center justify-start  bg-[#fafbfd] p-[4px] rounded-md"
          style={{border: '1px solid #d3dae6'}}
        >
          {tabs.map((tab, index) => (
            <div
              key={index}
              onClick={() => {
                handleTabClick(tab.value);
                tab.onClick(index);
              }}
              className={`relative flex h-full items-center justify-center px-[15px] hover:cursor-pointer`}
            >
              {tab.icon && selectedTab !== tab.value ? tab.icon : tab.activeIcon}

              <p
                className={`${
                  selectedTab === tab.value ? 'text-white' : 'text-black'
                } z-10 text-center text-[14px] font-medium leading-[32px] tracking-[-.25px]`}
              >
                {t(`${tab.text}`)}
              </p>
              {selectedTab === tab.value && (
                <motion.div
                  transition={{ duration: 0.15 }}
                  title={t(`${tab.text}`)}
                  layoutId="highlight"
                  className="absolute inset-0 z-0 bg-primary"
                />
              )}
            </div>
          ))}
        </div>
      </LayoutGroup>
    </div>
  );
};

export default ButtonTabs;
