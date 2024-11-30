import React from 'react'
import { useTranslation } from 'react-i18next';

interface Props {
    tags: string[]
}

const TableTags = ({ tags }: Props) => {
    const { t } = useTranslation();
    if (tags.length === 0 || tags === undefined) return (
        <div className="flex flex-row w-full gap-2 px-3 truncate">
            <span className='px-2 font-fira w-max'
                style={{
                    border: '1px solid #BAC3D4',
                }}>{t('multiMap.marker.noTags')}</span>
        </div>
    )
    return (
        <div className="flex flex-row w-full gap-2 px-3 truncate">
            {
                tags.map((tag, index) => (
                    <span className='px-2 font-fira w-max' key={index + crypto.getRandomValues(new Uint32Array(1))[0]}
                        style={{
                            border: '1px solid #BAC3D4',
                        }}>{tag}</span>
                ))
            }
        </div>
    )
}

export default TableTags