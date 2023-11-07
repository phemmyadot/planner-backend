import { Module } from '@nestjs/common';
import { PlanController } from './plan.controller';
import { PlanService } from './plan.service';
import { HistoryModule } from './history.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Plan, PlanSchema } from './plan.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Plan.name, schema: PlanSchema }]),
    HistoryModule,
  ],
  controllers: [PlanController],
  providers: [PlanService],
})
export class PlanModule {}
