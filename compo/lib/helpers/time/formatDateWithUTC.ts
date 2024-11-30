import moment from 'moment-timezone';

export const formatDateTimeWithUTC = (timestamp: string,format?:string): string => {

  const localDateTime = moment.tz(timestamp, 'Europe/Brussels');
  const formattedDateTime = localDateTime.format(`${format ? format : 'DD.MM.YYYY HH:mm:ss'}`);
  const utcOffset = localDateTime.format('Z'); // e.g., +01:00 or +02:00

  // Format the offset to display as UTC+1 or UTC+2
  const utcOffsetFormatted = `UTC${utcOffset.substring(0, 3)}`;

  return `${formattedDateTime} ${utcOffsetFormatted}`;
};
