export const dateRegex = /^(\d{4})-(\d{2})-(\d{2})$/;

export function formatDate(date: string | Date | number) {
    const dateObject = date instanceof Date ? date : new Date(date);

    const year = dateObject.getFullYear();
    const month = padStartZero(dateObject.getMonth() + 1);
    const day = padStartZero(dateObject.getDate());

    return `${year}-${month}-${day}`;
}

export function formatTimeToHuman(
    date: string | Date | number,
    needSeconds = false
) {
    const dateObject = new Date(date);

    const hours = padStartZero(dateObject.getHours());
    const minutes = padStartZero(dateObject.getMinutes());
    const secondes = padStartZero(dateObject.getSeconds());

    if (needSeconds) return `${hours}:${minutes}:${secondes}`;
    return `${hours}:${minutes}`;
}

export function formatDateToHuman(
    date: string | Date | number,
    needHours = false,
    needSeconds = false
) {
    const dateObject = new Date(date);

    const year = dateObject.getFullYear();
    const month = padStartZero(dateObject.getMonth() + 1);
    const day = padStartZero(dateObject.getDate());
    const hours = padStartZero(dateObject.getHours());
    const minutes = padStartZero(dateObject.getMinutes());
    const secondes = padStartZero(dateObject.getSeconds());

    if (needHours && needSeconds)
        return `${day}/${month}/${year} ${hours}:${minutes}:${secondes}`;
    if (needHours) return `${day}/${month}/${year} ${hours}:${minutes}`;

    return `${day}/${month}/${year}`;
}

export function nextMonth(date: string | Date | number) {
    const next = new Date(date);
    next.setMonth(next.getMonth() + 1);

    return next;
}

export function previousMonth(date: string | Date | number) {
    const prev = new Date(date);
    prev.setMonth(prev.getMonth() - 1);

    return prev;
}

export function nextDay(date: string | Date | number, days: number = 1) {
    const next = new Date(date);
    next.setDate(next.getDate() + days);

    return next;
}

export function previousDay(date: string | Date | number) {
    const prev = new Date(date);
    prev.setDate(prev.getDate() - 1);

    return prev;
}

export function previousYear(date: string | Date | number) {
    const prev = new Date(date);
    prev.setFullYear(prev.getFullYear() - 1);

    return prev;
}

export const dayNames = [
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
    'sunday'
];
export const monthNames = [
    'january',
    'february',
    'march',
    'april',
    'may',
    'june',
    'july',
    'august',
    'september',
    'october',
    'november',
    'december'
];

export function formatDayAndMonthToHuman(date: Date | string): string {
    if (!date) return '';
    if (typeof date === 'string') date = new Date(date);

    const day = date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`;
    const month =
        date.getMonth() + 1 > 9
            ? date.getMonth() + 1
            : `0${date.getMonth() + 1}`;

    return `${day}/${month}`;
}

export function getDaysInterval(size: number, offset = 0) {
    const dayInMs = 86400000;

    const start = new Date().getTime() - dayInMs * offset;
    const end = start + dayInMs * size;

    return { start: formatDate(start), end: formatDate(end) };
}

export function addDaysToDate(date: string | Date | number, days: number) {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + days);

    return newDate;
}

export function getNumberOfDaysBetweenDates(
    date1: string | Date | number,
    date2: string | Date | number
) {
    const d1 = new Date(date1);
    const d2 = new Date(date2);

    const diff = Math.abs(d1.getTime() - d2.getTime());
    const diffDays = Math.ceil(diff / (1000 * 3600 * 24));

    return diffDays;
}

export function getFormattedDaysInInterval(
    start: string | Date | number,
    end: string | Date | number,
    includeEnd = false
) {
    if (!start || !end) return [];

    const startDate = new Date(start);
    const endDate = new Date(end);

    startDate.setHours(12, 0, 0, 0);
    endDate.setHours(12, 0, 0, 0);

    if (includeEnd) endDate.setDate(endDate.getDate() + 1);

    const days = [];
    for (
        let date = startDate;
        date < endDate;
        date.setDate(date.getDate() + 1)
    ) {
        days.push(formatDate(date));
    }

    return days;
}

export function queryIntervalGuard(
    start: string | null,
    end: string | null,
    size: number,
    offset = 0
) {
    if (!start && !end) {
        return getDaysInterval(size - 1, offset);
    }

    if (!end || getNumberOfDaysBetweenDates(start!, end) > size - 1) {
        return {
            start: start!,
            end: formatDate(addDaysToDate(start!, size - 1))
        };
    }

    if (!start) {
        return { start: formatDate(addDaysToDate(end, -(size - 1))), end };
    }

    return { start, end };
}

export function getMonthYearInterval(
    startDate: string | Date,
    endDate: string | Date
) {
    const start = new Date(startDate);
    start.setDate(1);
    const end = new Date(endDate);
    end.setDate(1);
    const datesArray = [] as string[];

    let currentDate = new Date(start);
    while (currentDate <= end) {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth() + 1;

        datesArray.push(`${year}-${padStartZero(month)}-01`);

        currentDate.setMonth(month);

        if (month === 0) {
            currentDate.setFullYear(year + 1);
        }
    }

    return datesArray;
}

export function isDateInInterval(
    date: string | Date,
    start: string | Date,
    end: string | Date
) {
    const dateObject = typeof date === 'string' ? new Date(date) : date;
    let startObject = typeof start === 'string' ? new Date(start) : start;
    let endObject = typeof end === 'string' ? new Date(end) : end;

    if (startObject > endObject)
        [startObject, endObject] = [endObject, startObject];

    return dateObject >= startObject && dateObject <= endObject;
}

export function getMonthIntervalForDate(date: string | Date | null = null) {
    const currentDate = date ? new Date(date) : new Date();

    const start = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        1
    );
    const end = nextMonth(start);

    return { start: formatDate(start), end: formatDate(previousDay(end)) };
}

export function getIntervalsMonthDays(
    actualDate: string,
    previousDate: string
) {
    let cDate = new Date(actualDate);
    let cY = cDate.getFullYear();
    let cM = cDate.getMonth();

    let pDate = new Date(previousDate);
    let pY = pDate.getFullYear();
    let pM = pDate.getMonth();

    const currentStartDay = new Date(cY, cM, 1).getDay();

    const previousStartDay = new Date(pY, pM, 1).getDay();
    const diff =
        currentStartDay >= previousStartDay
            ? currentStartDay - previousStartDay
            : 7 - (previousStartDay - currentStartDay);

    const dates = {
        current: {
            startDate: formatDate(new Date(cY, cM, 1)),
            endDate: formatDate(new Date(cY, cM + 1, 1))
        },
        previous: {
            startDate: formatDate(new Date(pY, pM, 1 + diff)),
            endDate: formatDate(new Date(pY, pM + 1, 1 + diff))
        }
    };

    return dates;
}

export function isLeapYear(year: number) {
    return year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0);
}
