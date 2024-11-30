import React, { useState } from 'react';
import { SelectOption } from './Select';
import { ChevronDownIcon } from '../../icons/chevron-down';
import { useTranslation } from 'react-i18next';
import { AddIcon } from '../../icons/add';
import { MagnifyIcon } from '../../icons/magnify';

interface ExtraFieldDropdownProps {
    options: SelectOption[];
    onSelect: (option: SelectOption) => void;
    translationPrefix?: string;
}

const ExtraFieldDropdown = ({ options, onSelect, translationPrefix }: ExtraFieldDropdownProps) => {
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const handleToggle = () => {
        setIsOpen(!isOpen);
    }

    const handleSelect = (option: SelectOption) => {
        onSelect(option);
        setIsOpen(false);
    }

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    }

    const filteredOptions = options.filter(option => {
        const translatedLabel = t(`${translationPrefix}.${option.label.toLowerCase()}`);
        return translatedLabel.toLowerCase().includes(searchTerm.toLowerCase());
    });

    return (
        <div className="relative w-full h-[32px] bg-white mb-10 mt-2">
            <div
                className="flex items-center justify-between px-2 py-2 rounded-[2px] cursor-pointer"
                onClick={handleToggle}
                style={{ border: '1px solid #d1d5db' }}
            >
                <div className="flex items-center gap-2">
                    <AddIcon className="w-4 h-4  fill-primary" />
                    <span className="text-blue-500">Extra filterveld ({options.length}) uit importdata</span>
                </div>
                <ChevronDownIcon className={` fill-primary ${isOpen ? 'rotate-180' : ''} transition-transform`} />
            </div>
            {isOpen && (
                <div className="absolute left-0 w-full bg-white border border-gray-300 rounded shadow-lg z-10 h-40 overflow-y-auto">
                    <div className="flex flex-row items-center px-2 py-1" style={{ borderBottom: '1px solid #E7E9F2' }}>
                        <input
                            type="text"
                            value={searchTerm}
                            placeholder="Zoeken..."
                            onChange={(e) => {
                                e.stopPropagation();
                                handleSearchChange(e);
                            }}
                            onClick={(e) => e.stopPropagation()}
                            className="flex-1 w-full px-1 h-7"
                        />
                        <MagnifyIcon className="w-4 h-4" />
                    </div>
                    {filteredOptions.map((option, index) => (
                        <div
                            key={index}
                            className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                            onClick={() => handleSelect(option)}
                        >
                            {t(`${translationPrefix}.${option.label.toLowerCase()}`)}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ExtraFieldDropdown;
