// src/modules/plan/plan.controller.ts

import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Query,
} from '@nestjs/common';
import { PlanService } from './plan.service';
import { Plan } from './plan.model';
import { CreatePlanDto, RecordPaymentDto, UpdatePlanDto } from './plan.dto';
import { Status } from 'src/enums/status.enum';

@Controller('plans')
export class PlanController {
  constructor(private readonly planService: PlanService) {}

  @Get()
  async findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('status') status?: string,
    @Query('sort') sort = 'created:desc',
  ): Promise<Plan[]> {
    return this.planService.findAll(page, limit, status, sort);
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Plan> {
    return this.planService.findById(id);
  }

  @Post()
  async create(@Body() createPlanDto: CreatePlanDto): Promise<Plan> {
    return this.planService.create(createPlanDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePlanDto: UpdatePlanDto,
  ): Promise<Plan> {
    return this.planService.update(id, updatePlanDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Plan> {
    return this.planService.delete(id);
  }

  @Post(':id/record-payment')
  async recordPayment(
    @Param('id') id: string,
    @Body() payment: RecordPaymentDto,
  ): Promise<Plan> {
    return this.planService.recordPayment(id, payment);
  }

  @Put(':id/change-status')
  async changeStatus(
    @Param('id') id: string,
    @Body('newStatus') newStatus: Status,
  ): Promise<Plan> {
    return this.planService.changeStatus(id, newStatus);
  }
}
