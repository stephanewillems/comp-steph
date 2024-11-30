import { PDFDocument } from 'pdf-lib';
import moment from 'moment';
import * as XLSX from 'xlsx';

export const getCreationDate = (file: File): Promise<{ creationDate: string | null, isEncrypted: boolean, newFile?: File }> => {
    console.log(file)
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.onload = async () => {
            const result = fileReader.result;
            console.log(result)
            if (file.type === 'application/pdf') {
                let pdf: PDFDocument | null = null;
                try {
                    pdf = await PDFDocument.load(result as ArrayBuffer, {
                        updateMetadata: false,
                        ignoreEncryption: true,
                    });

                    let creationDate: string | null = null;
                    let isEncrypted: boolean = false;

                    if (pdf) {
                        try {
                            creationDate = moment(pdf.getCreationDate()).format('YYYY-MM-DD HH:mm:ss');
                        } catch (error) {
                            creationDate = moment().format('YYYY-MM-DD HH:mm:ss');
                        }
                        isEncrypted = pdf.isEncrypted;
                    }

                    resolve({ creationDate, isEncrypted });
                } catch (error) {
                    reject(error);
                }
            } else if (file.type === 'text/html') {
                try {
                    const htmlContent = result as string;
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(htmlContent, 'text/html');


                    // Check for "Google Confidential and Proprietary"
                    if (htmlContent.includes('Google Confidential and Proprietary')) {
                        // Replace the content while preserving the structure
                        let bodyContent = doc.body.innerHTML;

                        bodyContent = bodyContent.replace(/<tr>/g, '\n <tr>').replace(/<\/tr>/g, '</tr>');
                        bodyContent = bodyContent.replace(/<td>/g, '<td>').replace(/<\/td>/g, '');
                        bodyContent = bodyContent.replace(/<\/table>/g, '</table> \n');
                        bodyContent = bodyContent.replace(/<[^>]*>/g, '\n').replace(/\n+/g, '\n');

                        doc.body.innerHTML = bodyContent;


                        // Create a new TXT file with the modified text content
                        const allText = doc.body.textContent || "";

                        const blob = new Blob([allText], { type: 'text/plain' });
                        const newFile = new File([blob], `${file.name}.txt`, { type: 'text/plain' });
                        // download the new file for debugging
                        // download the new file for debugging
                        //  const url = URL.createObjectURL(newFile);
                        //  const a = document.createElement('a');
                        //  a.href = url;
                        //  a.download = 'content.txt';
                        //  a.click();
                        //  URL.revokeObjectURL(url);

                        resolve({ creationDate: moment().format('YYYY-MM-DD HH:mm:ss'), isEncrypted: false, newFile });
                    } else {
                        // Normal parsing
                        const allText = doc.body.textContent || "";


                        // Create a new TXT file with the text content
                        const blob = new Blob([allText], { type: 'text/plain' });
                        const newFile = new File([blob], `${file.name}.txt`, { type: 'text/plain' });
                        
                        // download the new file for debugging
                        //  const url = URL.createObjectURL(newFile);
                        //  const a = document.createElement('a');
                        //  a.href = url;
                        //  a.download = 'content.txt';
                        //  a.click();
                        //  URL.revokeObjectURL(url);

                        resolve({ creationDate: moment().format('YYYY-MM-DD HH:mm:ss'), isEncrypted: false, newFile });
                    }
                } catch (error) {
                    reject(error);
                }

            } else if (file.type === 'text/csv') {
                try {
                    const dataString = result as string;
                    const workbook = XLSX.read(dataString, { type: 'string' });
                    // Assuming the creation date is in a specific cell, e.g., A1
                    let creationDate: string | null = null;
                    const firstSheetName = workbook.SheetNames[0];
                    const worksheet = workbook.Sheets[firstSheetName];

                    if (worksheet['A1']) {
                        const cellValue = worksheet['A1'].v;
                        const match = cellValue.match(/Creation Date:\s*(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2})/);
                        if (match) {
                            creationDate = match[1];
                        }
                    }

                    if (!creationDate) {
                        // Fallback to the file's last modified date if no creation date is found in the file content
                        creationDate = moment(file.lastModified).format('YYYY-MM-DD HH:mm:ss');
                    }

                    resolve({ creationDate, isEncrypted: false });
                } catch (error) {
                    reject(error);
                }
            } else if (file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || file.type === 'application/vnd.ms-excel') {
                try {
                    const dataArrayBuffer = result as ArrayBuffer;
                    const workbook = XLSX.read(dataArrayBuffer, { type: 'array' });

                    // Assuming the creation date is in a specific cell, e.g., A1
                    let creationDate: string | null = null;
                    const firstSheetName = workbook.SheetNames[0];
                    const worksheet = workbook.Sheets[firstSheetName];

                    if (worksheet['B5']) {
                        const cellValue = worksheet['A1'].v;
                        const match = cellValue.match(/\s*(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2})/);
                        if (match) {
                            creationDate = match[1];
                        }
                    }

                    if (!creationDate) {
                        // Fallback to the file's last modified date if no creation date is found in the file content
                        creationDate = moment(file.lastModified).format('YYYY-MM-DD HH:mm:ss');
                    }

                    resolve({ creationDate, isEncrypted: false });
                } catch (error) {
                    reject(error);
                }
            } else if (file.type === "text/plain") {
                console.log('triggered if text/plain')
                resolve({ creationDate: moment().format('YYYY-MM-DD HH:mm:ss'), isEncrypted: false, newFile: file });
            } else {
                resolve({ creationDate: null, isEncrypted: false });
            }
        };

        fileReader.onerror = reject;

        if (file) {
            if (file.type === 'application/pdf') {
                fileReader.readAsArrayBuffer(file);
            } else if (file.type === 'text/html' || file.type === 'text/csv' || file.type === 'text/plain') {
                fileReader.readAsText(file);
            } else if (file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || file.type === 'application/vnd.ms-excel') {
                fileReader.readAsArrayBuffer(file);
            }
        }
    });
};
