import { isValid } from 'date-fns';

export function isDateValid(date: Date | number | string | null) {
  const dateToCheck = date instanceof Date ? date : !!date && new Date(date);
  return !!date && isValid(dateToCheck);
}

export function getTimezoneOffset(date: Date) {
  return date.getTimezoneOffset() * 60000;
}

export function convertDateToISOString(date?: Date) {
  if (!date || !isDateValid(date)) return null;

  return new Date(
    date.getTime() - getTimezoneOffset(date),
  ).toISOString();
}

export const convertISOStringToDate = (date: string | null) => {
  if (!date || !isDateValid(date)) return null;

  const outputDate = new Date(date);
  return new Date(outputDate.getTime() + getTimezoneOffset(outputDate));
};