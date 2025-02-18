import { RecordStatus, TaxPeriod } from '~shared/model/enum';

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
