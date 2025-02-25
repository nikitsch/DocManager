export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export enum TaxPeriod {
  PERIOD_MONTH = 'PERIOD_MONTH',
  PERIOD_Q1 = 'PERIOD_Q1',
  PERIOD_Q2 = 'PERIOD_Q2',
  PERIOD_Q3 = 'PERIOD_Q3',
  PERIOD_Q4 = 'PERIOD_Q4',
  PERIOD_YEAR = 'PERIOD_YEAR',
}

export enum RecordDirection {
  IN = 'IN',
  OUT = 'OUT',
}

export enum RecordStatus {
  NEW = 'NEW',
  IN_PROCESS = 'IN_PROCESS',
  FINISHED = 'FINISHED',
  REJECTED = 'REJECTED',
}

export enum Order {
  ASC = 'asc',
  DESC = 'desc',
} //TODO: move out to global

export enum FieldsForSortRecords {
  created_at = 'created_at',
  record_number = 'record_number',
  //TODO: record_type = 'record_type',
  record_type_entity = 'record_type_entity',
  tax_period = 'tax_period',
  record_status = 'record_status',
}
