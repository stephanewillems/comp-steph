import React from 'react'
import { useTranslation } from 'react-i18next';

export interface Tab {
    id: number;
    name: string;
    icon?: JSX.Element;
    total?: number;
}

interface ContentTabsProps {
    tabs: Tab[];
    tabsRef: React.MutableRefObject<HTMLDivElement[]>;
    activeTab: number;
    setActiveTab: (index: number) => void;
}

/*
 * Component for rendering tabs
    * @param tabs - array of tabs
    *   @param id - id of tab
    *   @param name - translation key for tab name
    *   @param icon - icon for tab
    * @param tabsRef - reference to tabs
    * @param activeTab - active tab
    * @param setActiveTab - function to set active tab
    * @returns - returns tabs
    * @example
    * const tabs = [
    *  { id: 0, name: 'Logboek', icon: <TableListIcon />, total: totalSocMed },
    * { id: 1, name: 'Unieke IPs', icon: <TableClusterIcon />, total: 10 },
    * { id: 2, name: 'Bookmarks', icon: <TableClusterIcon />, total: 5 },
    * ];
    * <ContentTabs tabs={tabs} tabsRef={tabsRef} activeTab={activeTab} setActiveTab={setActiveTab} /> 
*/

const ContentTabs = ({ tabs, tabsRef, activeTab, setActiveTab }: ContentTabsProps) => {
    const { t } = useTranslation();

    return (
        <>
            {tabs.map((tab, index) => (
                <div
                    key={tab.id}
                    ref={el => tabsRef.current[index] = el as HTMLDivElement}
                    className={`flex flex-row items-end justify-center h-10 gap-2 px-5 pb-3 cursor-pointer `}
                    onClick={() => setActiveTab(index)}
                >
                    {tab.icon && activeTab === tab.id
                        ? React.cloneElement(tab.icon, { fill: '#0073E6' })
                        : tab.icon ? React.cloneElement(tab.icon, { fill: '#A1A7B3' }) : null
                    }

                    <div className={`text-[14px] font-[600] leading-none font-inter ${activeTab === index ? 'text-primary' : 'text-primary-info'}`}>{t(`${tab.name}`)}</div>

                    {
                        typeof tab.total !== 'undefined' &&
                        <div className={`rounded-[3px] px-[3.5px] py-[2px] text-white text-xs font-bold ${activeTab === index ? 'bg-primary' : 'bg-primary-info'}`}>
                            {tab.total}
                        </div>
                    }
                </div>
            ))}

        </>
    )
}

export default ContentTabs
