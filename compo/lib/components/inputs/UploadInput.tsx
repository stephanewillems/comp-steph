import React from 'react'
import { UploadFileIcon } from '../../icons/upload-file';

interface UploadInputProps {
    fileName: string;
    handleFileInputClick: () => void;
    handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    fileInputRef: React.RefObject<HTMLInputElement>;
}

/* 
* Component for rendering upload input
* @param fileName - file name
* @param handleFileInputClick - function to handle file input click
* @param handleFileChange - function to handle file change
* @param fileInputRef - reference to file input
* @returns - returns upload input
* @example
* <UploadInput fileName='file.txt' handleFileInputClick={() => console.log('file input clicked')} handleFileChange={(e) => console.log(e.target.files)} fileInputRef={fileInputRef} />
*/


const UploadInput = ({ fileName, handleFileInputClick, handleFileChange, fileInputRef }: UploadInputProps) => {
    return (
        <div className='flex items-center text-[16px] w-full h-[32px]' style={{
            border: '1px solid #5C7A99',
            borderRadius: '4px',
        }}>
            <input type='text' className='flex-grow px-2 py-1 truncate border-line' value={fileName} readOnly />
            <button onClick={handleFileInputClick} className='p-2'>
                <UploadFileIcon className='w-5 fill-primary hover:scale-105' />
            </button>
            <input type='file'
                ref={fileInputRef}
                onChange={handleFileChange}
                multiple={false}
                style={{ display: 'none' }}
            />
        </div>
    )
}

export default UploadInput
