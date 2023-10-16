import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from './entities/task.entity';
import { InjectModel } from '@nestjs/mongoose';
//import { Task } from './schemas/tasks.schema';
import { Model } from 'mongoose';
import { Category } from '../category/schemas/category.schema';


@Injectable()
export class TasksService {
  constructor(@InjectModel('Task') private readonly taskModel: Model<Task> ) {}

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
    const taskToupdate = await this.taskModel.findOneAndUpdate((task) => task.id === taskId);
    taskToupdate.priority = priority;
    return taskToupdate ;
  
  } 


  async geTasksByPriority(priority: String) {
    return this.taskModel.find(task => task.priority === priority);
  }
  
  async setTaskDate(id: string, dueDate: Date) {
    
    try {
      const task = await this.taskModel.findById(id); 

      if (!task) {
        throw new NotFoundException('Task with ${id} not found.');
    }

      task.dueDate = dueDate;
      await task.save();

      return task;
    } catch (error) {
      throw new NotFoundException('Error updating task due date: ${error.message');
    }

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
    try {

    
      const tasks = await this.taskModel.findById(id);

      if (!tasks){
        throw new NotFoundException('Task not found');
      
      }
    
      tasks.category_id = category_id;
      await tasks.save();

      return tasks;
    } catch (error) {
      throw new Error('Error assigning category:' + error.message);
    }
}

  async delete_category(id: string, category_id: string): Promise<string> {
    
    const task: Task = await this.taskModel.findById(id);

    if(!task) {
      throw new NotFoundException('Task not found');
    }

    const categoryIndex = task.categories.findIndex((catId) => catId === category_id);

    if (categoryIndex === -1 ) {
        throw new NotFoundException('Category not found for this task');
    }

    task.categories.splice(categoryIndex,1);

    this.taskModel.updateOne(task)

    return 'Category removed successfully';
  }

  async findTaskById(taskId: string) {
    const task = await  this.taskModel.find((t) => t.id === taskId);

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    return task; 
  }
  async update_status(id: string, task_status: string): Promise<Task> {
    const taskupdate = await this.taskModel.findByIdAndUpdate(id, {status: task_status}, {new: true});
    
    if (!taskupdate) {
      throw new NotFoundException('Task not found');
    }

    return taskupdate;
  }

  async getupdated_status(id: string): Promise<string | undefined> {
    const task = this.taskModel[id];
    if (task) {
      return task.status;
    }
    throw new Error('Task not found');
}

async findAllCompletedTasks(): Promise<any[]> {
  return await this.taskModel.find({completed:true});
}

async getIncompletedTask(): Promise<any[]> {
  return await this.taskModel.find({completed: false});
}

async sortTasks(sortBy: string): Promise<Task[]> {
  return this.taskModel.find({ order: {[ sortBy]: 'ASC'}});
}

async filterTasks(Category: string, status: string): Promise<Task[]> {
  const whereClause = {};
  if (Category) whereClause['category'] = Category;
  if (status) whereClause['status'] = status; 
  return this.taskModel.find({ where: whereClause});
}

async shareTask(id: string, sharedWithUserId: string): Promise<Task> {

  const task = await this.taskModel.findById(id);

  if (!task) {
    throw new Error('Task not found');
  }

  task.sharedWith.push(sharedWithUserId);

  return task.save();

}
  async getSharedTasks(id: string): Promise<Task[]> {
    return this.taskModel.find({ sharedWith: id}).exec();

  }
}

  


