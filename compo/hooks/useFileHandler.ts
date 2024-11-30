import { useState } from 'react';
import { getCreationDate } from '../lib/helpers/pdfMetaData/getCreationDate';

const useFileHandler = (initialFileName = 'No file selected') => {
  const [fileName, setFileName] = useState(initialFileName);
  const [file, setFile] = useState<File | null>(null);
  const [creationDate, setCreationDate] = useState<string | null>(null);
  const [isEncrypted, setIsEncrypted] = useState(false);

  console.log(fileName)



  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    console.log(file)
    if (file) {
      try {
        console.log('triggered')
        console.log(file)
        const { creationDate, isEncrypted, newFile } = await getCreationDate(file);
        console.log(creationDate)
        setIsEncrypted(isEncrypted);
        setCreationDate(creationDate);

        if (newFile) {
          setFileName(newFile.name);
          setFile(newFile);
        } else {
          setFileName(file.name);
          setFile(file);
        }
      } catch (error) {
        console.error('Error fetching file metadata:', error);
        setFileName(initialFileName);
        setFile(null);
        setCreationDate(null);
        setIsEncrypted(false);
      }
    } else {
      setFileName(initialFileName);
      setFile(null);
      setCreationDate(null);
      setIsEncrypted(false);
    }
  };

  return { fileName, file, creationDate, isEncrypted, handleFileChange };
};

export default useFileHandler;
