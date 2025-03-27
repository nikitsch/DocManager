import { isValid } from 'date-fns';

function isDateValid(date: Date | number | string | null) {
  const dateToCheck = date instanceof Date ? date : !!date && new Date(date);
  return !!date && isValid(dateToCheck);
}

function getTimezoneOffset() {
  const now = new Date();
  return now.getTimezoneOffset() * 60 * 1000;
}

export function convertDateToISOString(date?: Date) {
  if (!date || !isDateValid(date)) return null;

  return new Date(date.getTime() - getTimezoneOffset()).toISOString();
}

export const convertISOStringToDate = (date: string | null) => {
  if (!date || !isDateValid(date)) return null;

  const outputDate = new Date(date);
  return new Date(outputDate.getTime() + getTimezoneOffset());
};
