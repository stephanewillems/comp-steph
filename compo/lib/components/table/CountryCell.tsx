import React from 'react'


interface Props {
    url: string;
    countryCode: string;
}

const CountryCell = ({ url, countryCode }: Props) => {
    url ? url : 'N/A'
    countryCode ? countryCode : 'N/A'
    return (
        <div className='flex flex-row items-center gap-2'>
            <img src={url} alt={countryCode} className='rounded-[2px] h-5 w-6' />
            <p className='text-sm font-black font-inter'>{countryCode}</p>

        </div>
    )
}

export default CountryCell
