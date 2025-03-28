import {
  RecordDirection,
  RecordStatus,
  TaxPeriod,
  UserRole,
} from '~shared/model/enum';

export interface IUser {
  user_id: number;
  username: string;
  role: UserRole;
  organization_name: string;
}

export interface IUserAuthResponse {
  userid: number;
  username: string;
  role: UserRole;
}

export interface IRecord {
  record_id: number;
  user_id: number;
  organization_name: string;
  tax_period: TaxPeriod;
  record_number: string;
  record_direction: RecordDirection;
  record_status: RecordStatus;
  record_type_entity: IRecordTypeEntity;
  record_subtype: string | null;
  record_comment: string;
  reason_for_rejection: string | null;
  created_at: string;
  updated_at: string[] | null;
  in_process_at: string | null;
  finished_at: string | null;
  rejected_at: string | null;
  record_files: {
    id: string;
    name: string;
    extension: string;
  }[];
}

export interface IRecordTypeEntity {
  id: number;
  type: string;
}

export interface IRecordTable {
  data: IRecord[];
  total: number;
}
