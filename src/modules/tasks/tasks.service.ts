import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from './schemas/tasks.schema';
import { Model } from 'mongoose';


@Injectable()
export class TasksService {
  constructor(@InjectModel(Task) private readonly taskModel: Model<Task> ) {}

  async findAll(): Promise<Task[]> {
    return await this.taskModel.find().exec();
  }
  
  async findOne (id: string): Promise<Task> {
    return await this.taskModel.findById(id).exec();
  }

  async create(Task: Task): Promise<Task> {
    const newTask = new this.taskModel(Task);
    return await newTask.save();
  }
  
  async update( id: string, task: Task ): Promise<Task> {
    return await this.taskModel.findByIdAndUpdate(id, task, { new: true });
  }

  async delete(id: string): Promise<Task> {
    return await this.taskModel.findByIdAndRemove(id);
  }

}
