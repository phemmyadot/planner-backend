import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema()
export class History {
  @Prop()
  date: string;
  // @Prop()
  // user: string;
  @Prop()
  action: string;
}

export type HistoryDocument = HydratedDocument<History>;
export const HistorySchema = SchemaFactory.createForClass(History);
