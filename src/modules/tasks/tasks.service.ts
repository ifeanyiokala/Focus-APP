import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from './schemas/tasks.schema';
import { Model } from 'mongoose';
import { Category } from '../category/schemas/category.schema';


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

  async updateTaskPriority(taskId: string, priority: string): Promise<Task> {
    const taskToupdate = await this.taskModel.find((task) => task.id === taskId);
    taskToupdate.priority = priority;
    return taskToupdate ;
  

  private tasks = [
    { id : 1, title: 'Task1 1', priority : 'high'},
    { id : 2, title: 'Task 2', priority : 'medium'},
    { id : 3, title: 'Task 3', priority : 'low'},
  ];

  async geTasksByPriority(priority: String) {
    return this.tasks.filter(task => task.priority === priority);
  }
}
  private tasks_date: { [id : string]: {dueDate: Date} } = {};

  async setTaskDate(id: string, dueDate: Date) {
    if (!this.tasks_date[id]) {
      throw new NotFoundException('Task with ${id} not found.');
    }

    this.tasks_date[id].dueDate = dueDate;
    return this.tasks_date[id];

  }

  async findAllTaskDueToday(): Promise<Task[]> {
    const today = new Date();
    today.setHours(0,0,0,0);
    return this.taskModel.find ({
      where: {
        dueDate: today,
      },
    });
  }

  async assignCategory(id: string, category_id: string): Promise<Task> {
    const tasks = this.task.find((t) => t.id === id);
  }

  if (!task){
    throw new NotFoundException('Task not found');
  }
  tasks.category_id = category_id;
  return task; 
  
  async delete_category(id: string, category_id: string): string{
    const task = this.findTaskById(id);
    const categoryIndex = task.categories.findIndex((catId => catId === categoryId),);

    if (categoryIndex === -1 ) {
        throw new NotFoundException('Category not found for this task');
    }

    task.categories.splice(categoryIndex,1);

    return 'Category removed successfully';
  }

  async findTaskById(taskId: string) {
    const task =await  this.tasks.find((t) => t.id === taskId);

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    return task; 
  }
  async update_status(id: string, task_status: string): Promise<Task> {
    const taskupdate = await this.tasks.find((task) => task.id === id);
    taskupdate.status = task_status;
    return taskupdate;

  }

  async getupdated_status(id: string): Promise<string | undefined> {
    const task = this.task[id];
    if (task) {
      return task.status;
    }
    throw new Error('Task not found');
}

async findAllCompletedTasks(): any[] {
  return await this.tasks.filter(task => task.completed);
}

async getIncompletedTask(): any[] {
  return await this.tasks.filter(task => !task.completed);
}

}



  


