import { endOfDay, startOfDay, sub } from 'date-fns';
import { convertDateToISOString } from '~shared/model/dates';
import { TimeBreakpoints } from '~shared/model/enum';

export const convertBreakpointToTimeRange = (
  breakpoint: TimeBreakpoints | null
) => {
  const today = new Date();
  let from, to;

  switch (breakpoint) {
    case TimeBreakpoints.TODAY:
      from = today;
      to = today;
      break;

    case TimeBreakpoints.WEEK:
      from = sub(today, { weeks: 1 });
      to = today;
      break;

    case TimeBreakpoints.MONTH:
      from = sub(today, { months: 1 });
      to = today;
      break;

    default:
      from = '';
      to = '';
      break;
  }

  return {
    from: convertDateToISOString(startOfDay(from)) ?? '',
    to: convertDateToISOString(endOfDay(to)) ?? '',
  };
};
