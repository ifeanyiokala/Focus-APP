import { Controller, Get, Post, Body, Put, Param, Delete, Patch, NotFoundException } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './schemas/tasks.schema';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  async create(@Body() task: Task): Promise<Task> {
    return await this.tasksService.create(task);
  }

  @Get()
  async findAll(): Promise<Task[]> {
    return await this.tasksService.findAll(task);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Task> {
    return await this.tasksService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() task: Task): Promise<Task> {
    return await this.tasksService.update(id, task);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Task> {
    return await this.tasksService.delete(id);
  }
  
  @Put(':id/priority')
  async updateTaskPriority(@Param('id') id: string, @Body('priority') priority : string): Promise<Task> {
    return await this.tasksService.updateTaskPriority(taskId, priority);
    //return await this.tasksService.updatePriority(id, priority );
    
  }

  @Get('priority')
  async getTasksByPriority(@Query('priority') priority: string) {
    return await this.tasksService.getTasksByPriority(priority);
  }

  @Patch('id/date')
  async setTaskDate(@Param('id') id: string, @Body('dueDate') dueDate: Date): Promise<Task> {
  try  {
    const updatedTask = await this.tasksService.setTaskDate(id, dueDate);
    if (!updatedTask) {
      throw new NotFoundException ('Task with ID ${taskId} not found.');
    }
    return updatedTask;
  } catch (error) {
    throw new NotFoundException(error.message);
  }
} 
  @Get('id/date')
  async findAllTaskDueToday(): Promise<{ tasks: Task[] }> {
    return await this.tasksService.findAllTaskDueToday();

  }

  @Post(':id/assign-category')
  async assignCategory(
    @Param('id')id : string,
    @Body('category_id') category_id: string,
  ) {
    try { 
      const updatedTask = await this.tasksService.assignCategory(
        id,
        category_id,
      ); 
      return { message: 'Category assigned succesfuly', task: updatedTask};
    } catch (error) {
      throw new NotFoundException('Task not found');
    }
  }

  @Delete('id/remove-category')
  async delete_category(
    @Param('id')id : string,
    @Body('category_id') category_id: string,
  ): Promise<Task>{ return this.tasksService.delete_category(id,category_id)

  }
  @Put('id/status')
  
}


