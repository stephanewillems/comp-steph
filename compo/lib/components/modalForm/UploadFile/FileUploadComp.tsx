import { useDroppable } from '@dnd-kit/core';
import * as XLSX from 'xlsx'
import React, { useEffect, useRef, useState } from 'react';
import { UploadFileIcon } from '../../../icons/upload-file';
import { WarningTriangleIcon } from '../../../icons/warning-triangle';
import { motion } from 'framer-motion';
import { CheckmarkIcon } from '../../../icons/checkmark';
import { exampleValuesRow, fieldsToMap } from '../../../../components/map/marker/panel/BulkUpload/uploadSlice';
import { useTranslation } from 'react-i18next';


/* 
* FileUploadComp component is used to upload files to the application.
* The component accepts multiple files and checks if the file type is accepted.
* The component also provides a template download option.
* 
* @param acceptedFileTypes: string - The accepted file types for the upload.
* @param multiple: boolean - If the component should accept multiple files.
* @param files: File[] - The files that are uploaded.
* @param setFiles: React.Dispatch<React.SetStateAction<File[]>> - The function to set the files.
* @param setValidFile?: React.Dispatch<React.SetStateAction<boolean>> - The function to set if the file is valid.
* @param templateText?: string - The text to display above the upload component.
* 
* @returns React.FunctionComponent
* @example
* <FileUploadComp
*  acceptedFileTypes="application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,text/csv"
* multiple={false}
* files={files}
* setFiles={setFiles}
* setValidFile={setValidFile}
* templateText="Upload the file with the following columns"
* />
*/

interface FileUploadCompProps {
  multiple?: boolean;
  acceptedFileTypes: string;
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
  setValidFile?: React.Dispatch<React.SetStateAction<boolean>>;
  templateText?: string;
}

const FileUploadComp = ({
  acceptedFileTypes,
  multiple = false,
  files,
  setFiles,
  setValidFile,
  templateText

}: FileUploadCompProps) => {
  const {t} = useTranslation();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFileType, setIsFile] = useState<boolean | null>(null);
  const [dragOver, setDragOver] = useState<boolean>(false);
  const { setNodeRef } = useDroppable({
    id: 'file-upload',
  });

  const isFileTypeAccepted = (file: File) => {
    return acceptedFileTypes.split(',').some((type) => file.type === type.trim() || file.name.endsWith(type.trim()));
  };

  useEffect(() => {
    if (files.length > 0) {
      // Check if at least one file is accepted to determine the initial state of isFileType
      const hasAcceptedFileType = files.some(isFileTypeAccepted);
      setIsFile(hasAcceptedFileType);
    } else {
      setIsFile(null);
    }
  }, [files]);



  const handleFiles = (newFiles: File[]) => {
    setIsFile(null);
    const filteredFiles = newFiles.filter(isFileTypeAccepted);
    const isFileType = filteredFiles.length > 0;
    setIsFile(isFileType);

    // Only set files if new files are provided
    if (!multiple && newFiles.length && isFileType) {
      setFiles([newFiles[0]]);
    } else {
      setFiles([...(files || []), ...newFiles]);
    }
    const isValid = isFileType;
    if (setValidFile) {
      setValidFile(isValid);
    }
  };

  useEffect(() => {
    const isValid = isFileType || false;
    if (setValidFile) {
      setValidFile(isValid);
    }
  }, [isFileType, files, setValidFile]);


  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
    setDragOver(false);

    if (e.dataTransfer.files) {
      const droppedFiles = [...(e.dataTransfer.files as unknown as File[])];
      handleFiles(droppedFiles);
    }
  };
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
    setDragOver(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = [...(e.target.files as unknown as File[])];
      if (selectedFiles.length > 0 && selectedFiles !== undefined) handleFiles(selectedFiles);
    }
  };

  const handleClick = () => {
    inputRef.current?.click();
  };


  const handleDownloadTemplate = () => {
    // create xls file from columns

    // remove fields from fieldsToMap and have a new array with only the right columns
    const notInclude = ['StreetNr','StreetNrBus','ZipcodeCity']
    const fields = fieldsToMap.filter(field => !notInclude.includes(field))
    const ws = XLSX.utils.aoa_to_sheet([fields]);
    // add a second  row
    XLSX.utils.sheet_add_aoa(ws, [exampleValuesRow], { origin: 1 });
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'TJILP_upload_template');
    XLSX.writeFile(wb, 'TJILP_upload_template.xlsx');
    
  }

  return (
    <div className="flex flex-col items-center justify-center w-full h-full ">
      {
        templateText && (
          <div className="flex flex-row items-center justify-center gap-3 py-3 text-md">
            <p>{templateText}</p>
            <button className="text-primary hover:underline" onClick={handleDownloadTemplate}>{t('lib.fileUploadDownloadTemplate')}</button>
          </div>
        )
      }
      <div
        ref={setNodeRef}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={handleClick}
        className={`relative group flex h-[60%] w-4/5 flex-col items-center justify-center gap-3 space-y-1 overflow-clip rounded-lg border-2 border-dotted bg-[#F4F7FB] px-10 py-20 hover:cursor-pointer ${isFileType === false ? 'border-red-400' : 'border-lightBlue '
          } ${dragOver ? 'shadow-xl' : ''}`}
      >
        <div
          className={`absolute bottom-0 left-0 z-40 h-1 bg-primary ${dragOver ? 'w-full' : 'w-0'
            } transition-all duration-100`}
        ></div>
        <input ref={inputRef} type="file" onChange={handleChange} className="hidden" multiple={multiple} />
        {isFileType === false || isFileType === null ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <UploadFileIcon className="transition-all duration-100 fill-blacks group-hover:scale-125" />
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <CheckmarkIcon className="fill-green-500" />
          </motion.div>
        )}
        <p>{t('lib.fileUpload')}</p>
        {isFileType === false ? (
          <div className="flex flex-col items-center justify-center gap-3">
            <WarningTriangleIcon className="fill-red-400" />
            <p className="text-red-400">{t('lib.fileUploadErrorFile')}</p>
            <p className="text-red-400">{t('lib.fileUploadErrorType')}</p>
          </div>
        ) : (
          <div>{files.length > 0 ? <p className="text-sm font-fira">{t('lib.fileUploadFileName')}:{files[0].name}</p> : ''}</div>
        )}

      </div>
    </div>
  );
};

export default FileUploadComp;
