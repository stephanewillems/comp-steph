/* eslint-disable valid-jsdoc */

/**
 * Format a timestamp and calculate a new time with added duration.
 * @param originalTimestamp The original timestamp in string format.
 * @param durationMinutes The duration to add in minutes.
 * @returns An array with two strings: [formattedOriginalTimestamp, newTimeHHMM].
 * @author Stéphane Willems
 */
export function formatTimeWithDuration(originalTimestamp: string, durationMinutes: number): [string, string] {
    const originalDate = new Date(originalTimestamp);
    
    // Format the original timestamp into another format (e.g., DD.MM.YYYY HH:MM)
    const formattedOriginalTimestamp = `${originalDate.getDate()}.${originalDate.getMonth() + 1}.${originalDate.getFullYear()} ${originalDate.getHours()}:${String(originalDate.getMinutes()).padStart(2, '0')}`;
    
    // Calculate the new timestamp with the added duration
    const newTimestamp = new Date(originalDate.getTime() + durationMinutes * 60000); // Convert minutes to milliseconds
    
    // Format the new timestamp into HH:MM
    const newTimeHHMM = `${String(newTimestamp.getHours()).padStart(2, '0')}:${String(newTimestamp.getMinutes()).padStart(2, '0')}`;
    
    return [formattedOriginalTimestamp, newTimeHHMM];
  }
  