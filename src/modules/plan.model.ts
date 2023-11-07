import { HydratedDocument } from 'mongoose';
import { PlanType } from 'src/enums/plan-type.enum';
import { Status } from 'src/enums/status.enum';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { History } from './history.model';

@Schema()
export class Payment {
  @Prop({ required: true })
  paymentAmount: number;
}

export type PaymentDocument = HydratedDocument<Payment>;
export const PaymentSchema = SchemaFactory.createForClass(Payment);

@Schema()
export class Plan {
  @Prop({ required: true })
  name: string;
  @Prop()
  description: string;
  @Prop({ required: true })
  deadline: string;
  @Prop()
  cost: number;
  @Prop()
  balance: number;
  @Prop([History])
  history: History[];
  @Prop()
  note: string;
  @Prop({ required: true })
  status: Status;
  @Prop({ required: true })
  type: PlanType;
  @Prop([Payment])
  payments: Payment[];
}

export type PlanDocument = HydratedDocument<Plan>;
export const PlanSchema = SchemaFactory.createForClass(Plan);
