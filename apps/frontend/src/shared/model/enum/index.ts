export enum RoutesPaths {
  ALL = '*',
  ARCHIVE = 'archive',
  CREATE = 'create',
  DEFAULT_PATH = '/',
  ID = ':id',
  LOGIN = 'login',
  REGISTER = 'register',
}

export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export enum RecordStatus {
  NEW = 'NEW',
  IN_PROCESS = 'IN_PROCESS',
  FINISHED = 'FINISHED',
  REJECTED = 'REJECTED',
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
