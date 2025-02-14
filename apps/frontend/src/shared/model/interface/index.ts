import { RecordDirection, RecordStatus, TaxPeriod } from '~shared/model/enum';

export interface IRecord {
  record_id: number;
  user_id: number;
  organization_name: string;
  tax_period: TaxPeriod;
  record_number: string;
  record_direction: RecordDirection;
  record_status: RecordStatus;
  record_type: string;
  record_subtype: string | null;
  record_comment: string;
  reason_for_rejection: string | null;
  created_at: Date;
  updated_at: string[] | null;
  in_process_at: Date | null;
  finished_at: Date | null;
  rejected_at: Date | null;
  record_files: {
    id: string;
    name: string;
    extension: string;
  }[];
}
