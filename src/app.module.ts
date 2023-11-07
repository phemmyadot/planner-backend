import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlanModule } from './modules/plan.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://babafemicodes:babafemicodes@cluster0.pwucqvf.mongodb.net/?retryWrites=true&w=majority',
      { dbName: 'planner' },
    ),
    PlanModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
