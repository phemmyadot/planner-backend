// src/modules/plan/plan.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePlanDto, RecordPaymentDto, UpdatePlanDto } from './plan.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Plan } from './plan.model';
import { Model } from 'mongoose';
import { History } from './history.model';
import { Status } from 'src/enums/status.enum';

@Injectable()
export class PlanService {
  constructor(@InjectModel(Plan.name) private planModel: Model<Plan>) {}

  async findAll(page, limit, status?, sort?): Promise<Plan[]> {
    const skip = (page - 1) * limit;

    let query = {};

    if (status) {
      query = { ...query, status };
    }

    const [field, order] = sort.split(':');
    let sortQuery = {};

    switch (field) {
      case 'created':
      case 'deadline':
      case 'name':
        sortQuery[field] = order === 'asc' ? 1 : -1;
        break;
      default:
        sortQuery = { created: -1 }; // Default to sorting by created date if an invalid field is provided
        break;
    }
    return await this.planModel
      .find(query)
      .skip(skip)
      .limit(+limit)
      .sort(sortQuery)
      .exec();
  }

  async findById(id: string): Promise<Plan> {
    return this.planModel.findById(id).exec();
  }

  async create(createPlanDto: CreatePlanDto): Promise<Plan> {
    const createdPlan = new this.planModel(createPlanDto);
    createdPlan.history.push(this.addHistory('created'));
    return createdPlan.save();
  }

  async update(id: string, updatePlanDto: UpdatePlanDto): Promise<Plan> {
    return this.planModel
      .findByIdAndUpdate(id, updatePlanDto, {
        new: true,
      })
      .exec()
      .then((plan) => {
        plan.history.push(this.addHistory('updated'));
        return plan.save();
      });
  }

  async delete(id: string): Promise<Plan> {
    return this.planModel
      .findByIdAndDelete(id)
      .exec()
      .then((plan) => {
        plan.history.push(this.addHistory('deleted'));
        return plan.save();
      });
  }

  async recordPayment(id: string, payment: RecordPaymentDto): Promise<Plan> {
    const plan = await this.planModel.findById(id).exec();

    if (!plan) {
      throw new NotFoundException('Plan not found');
    }

    plan.payments.push(payment);
    plan.balance -= payment.paymentAmount;
    plan.history.push(this.addHistory('payment recorded'));
    return plan.save();
  }

  addHistory(historyType: string): History {
    return {
      date: new Date().toISOString(),
      // user: 'system',
      action: historyType,
    };
  }

  async changeStatus(id: string, newStatus: Status): Promise<Plan> {
    const plan = await this.planModel.findById(id).exec();

    if (!plan) {
      throw new NotFoundException('Plan not found');
    }

    plan.status = newStatus;

    return await plan.save();
  }
}
