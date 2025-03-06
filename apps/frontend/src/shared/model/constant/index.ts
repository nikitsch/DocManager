import { RecordStatus, TaxPeriod, TimeBreakpoints } from '~shared/model/enum';

export const RecordStatusLabelMapper = {
  [RecordStatus.NEW]: 'New',
  [RecordStatus.IN_PROCESS]: 'In progress',
  [RecordStatus.REJECTED]: 'Rejected',
  [RecordStatus.FINISHED]: 'Finished',
};

export const TaxPeriodLabelMapper = {
  [TaxPeriod.PERIOD_MONTH]: 'Month',
  [TaxPeriod.PERIOD_Q1]: '1 quarter',
  [TaxPeriod.PERIOD_Q2]: '2 quarter',
  [TaxPeriod.PERIOD_Q3]: '3 quarter',
  [TaxPeriod.PERIOD_Q4]: '4 quarter',
  [TaxPeriod.PERIOD_YEAR]: 'Year',
};

export const TimeBreakpointsLabelMapper = {
  [TimeBreakpoints.TODAY]: 'Today',
  [TimeBreakpoints.WEEK]: 'Week',
  [TimeBreakpoints.MONTH]: 'Month',
};

export const DEFAULT_DATE_FORMAT = 'dd.MM.yyyy';
export const DEFAULT_MIN_DATE = new Date(2024, 0, 1);
export const DEFAULT_MAX_DATE = new Date(2099, 0, 1);

export const DEFAULT_FIELD_WIDTH = '200px';
