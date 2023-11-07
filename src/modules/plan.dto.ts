import { PlanType } from 'src/enums/plan-type.enum';
import { Status } from 'src/enums/status.enum';

export class CreatePlanDto {
  readonly name: string;
  readonly description: string;
  readonly deadline: string;
  readonly cost: number;
  readonly status: Status;
  readonly type: PlanType;
}

export class UpdatePlanDto {
  readonly description?: string;
  readonly deadline?: string;
  readonly note?: string;
  readonly status?: Status;
}

export class RecordPaymentDto {
  readonly paymentAmount: number;
}

export class AddHistoryDto {
  readonly date: string;
  // readonly user: string;
  readonly action: string;
}
