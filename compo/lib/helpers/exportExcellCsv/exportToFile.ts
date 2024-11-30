import * as XLSX from 'xlsx';

interface DataObject {
  [key: string]: any;
}

/* 
* Export data to file
* @param data: Data to export
* @param fileName: Name of the file
* @param fileType: Type of the file
* @returns void
* @author Stéphane
* 
* Example usage:
* exportToFile(data, 'file', 'xlsx');
* exportToFile(data, 'file', 'csv');
* 
* Note: data should be an array of objects
* 
*/

export const exportToFile = <T extends DataObject>(data: T[], fileName: string, fileType: 'xlsx' | 'csv') => {

  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(data);

  
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

  let binaryString;
  let mimeType;
  let extension;

  if (fileType === 'xlsx') {
    binaryString = XLSX.write(workbook, { bookType: 'xlsx', type: 'binary' });
    mimeType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    extension = 'xlsx';
  } else {
    binaryString = XLSX.write(workbook, { bookType: 'csv', type: 'binary' });
    mimeType = 'text/csv';
    extension = 'csv';
  }

 
  const blob = new Blob([s2ab(binaryString)], { type: mimeType });

  
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${fileName}.${extension}`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

const s2ab = (s: string) => {
  const buf = new ArrayBuffer(s.length);
  const view = new Uint8Array(buf);
  for (let i = 0; i < s.length; i++) {
    view[i] = s.charCodeAt(i) & 0xFF;
  }
  return buf;
};

