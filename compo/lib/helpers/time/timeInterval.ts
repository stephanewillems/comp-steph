import moment from 'moment';

export type DbState = {
  start: string;
  lag: number;
};

export type TimeInterval = {
  begin: string;
  end: string;
};

// Function to format a duration
export const formatDuration = (duration: number, accuracy?: string): string => {
  const dur = moment.duration(duration, 'minutes');

  const hours = Math.floor(dur.asHours());
  const minutes = Math.floor(dur.asMinutes()) - hours * 60;
  const seconds = Math.floor(dur.asSeconds()) - hours * 3600 - minutes * 60;

  const hh = `${hours}`.padStart(2, '0');
  const mm = `${minutes}`.padStart(2, '0');
  const ss = `${seconds}`.padStart(2, '0');

  if (accuracy === 'seconds') {
    return `${hh}:${mm}:${ss}`;
  } else {
    return `${hh}:${mm}`;
  }
};

type ReformatOptions = {
  addSeconds?: number;
  dateFormat?: string;
  zone1?: string;
  zone2?: string;
};

// Function to reformat date (date format and/or timezone)
export const reformatDate = (date: string | number, reformatOptions: ReformatOptions): string => {
  if (date === '/') {
    return date;
  } else {
    // Convert utc now to datetime
    if (date === 'now') {
      date = moment().utc().format('YYYY-MM-DDTHH:mm:ss[Z]');
    }

    const m = moment.tz(date, reformatOptions.zone1 ? reformatOptions.zone1 : 'UTC');

    if (reformatOptions.addSeconds) {
      m.add(reformatOptions.addSeconds, 'seconds');
    }

    return m
      .tz(reformatOptions.zone2 ? reformatOptions.zone2 : 'UTC')
      .format(reformatOptions.dateFormat ? reformatOptions.dateFormat : 'YYYY-MM-DDTHH:mm:ss');
  }
};

// Function to calculate total duration of (multiple) time intervals + format
export const totalDuration = (timeIntervals: TimeInterval[]): string => {
  // Init total duration
  let duration = 0;

  // Loop over time intervals
  timeIntervals.forEach((x) => {
    // Add if valid
    if (validTimeInterval(x)) {
      duration += moment.duration(moment(x.end).diff(moment(x.begin))).asMinutes();
    }
  });

  // Return as hh:mm
  return formatDuration(duration);
};

// Function to check if time interval is valid
export const validTimeInterval = (timeInterval: TimeInterval, dbState?: DbState): boolean => {
  let valid =
    timeInterval.begin !== '' && timeInterval.end !== '' && timeInterval.begin.localeCompare(timeInterval.end) < 0;

  // Also check if time interval between db start and end if dbState is defined
  if (dbState) {
    // Calculate end of db based on current time and lag
    const dbEnd = reformatDate('now', { addSeconds: -dbState.lag });

    // Time interval begin must be after or equal to db start
    const beginAfterDbStart = dbState.start.localeCompare(timeInterval.begin) <= 0;

    // Time interval end must be before db end
    const endBeforeDbEnd = timeInterval.end.localeCompare(dbEnd) < 0;

    // Update valid with two db conditions
    valid = valid && beginAfterDbStart && endBeforeDbEnd;
  }

  return valid;
};
