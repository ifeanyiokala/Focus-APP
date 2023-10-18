import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from '../tasks/schemas/tasks.schema';
import { CreateSearchDto } from './dto/create-search.dto';
import { UpdateSearchDto } from './dto/update-search.dto';

@Injectable()
export class SearchService {
  constructor(
    @InjectModel('Task') private readonly taskModel: Model<Task>,
  ) {}

  async searchTasks(keyword: string) {
    const tasks = await this.taskModel.find({ $text: {$search: keyword}});

    return tasks;
  }
}
