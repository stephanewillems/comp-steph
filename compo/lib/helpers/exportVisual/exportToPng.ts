import moment from 'moment';

interface exportPngProps {
  nameFile: string;
  className: string;
}

export const exportMapAsPNG = ({ nameFile, className }: exportPngProps) => {
  const mapCanvas = document.querySelector(`${className}`) as HTMLCanvasElement;
  if (mapCanvas) {
    const mapImageDataURL = mapCanvas.toDataURL('image/png');
    // Create a temporary link element
    const downloadLink = document.createElement('a');
    downloadLink.href = mapImageDataURL;
    downloadLink.download = `Report_${nameFile}_${moment().format('DD_MM_YYYY')}.png`;
    // Trigger the download
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  } else {
    console.error('No map canvas found.');
  }
};
