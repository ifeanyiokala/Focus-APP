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
    return await this.tasksService.updateTaskPriority(id, priority);
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

  @Get('id/status')
  async getupdated_status(@Param('id') id: string) {
    try {
      const status = await this.tasksService.getupdated_status(id);
      return { status };
    } catch (error) {
      throw new Error('Failed to get task status: ${error.message}')
    }
    }



  @Put('id/status')
  async update_status(
    @Param('id')id: string,
    @Body('updated_status') updated_status: string): Promise<Task> {
      try  {
        const updatedstatus = await this.tasksService.update_status(id, updated_status);
        return {task: updatedstatus};
      } catch (error) {
        throw new NotFoundException(error.message);  
      }
    }

  @Get('comleted')
  findAllCompletedTasks(): any[] {
    return this.tasksService.findAllCompletedTasks();
  }
  
  @Get('incomplete')
  findAllIncompletedTasks(): any [] {
    return this.tasksService.getIncompletedTasks();
  }

  @Post('id/shared')
  async shareTask(
    @Param('id') id: string,
    @Body('sharedWithUserId') sharedWithUserId: string,
  ) {
    try {
      const sharedTask = await this.tasksService.shareTask(id, sharedWithUserId);
      return sharedTask;
    } catch (error) {
      return  { error: error.message} ;
    }
  }

  @Get('id/shared')
  async getsharedTasks(id: string) {
    return  await this.tasksService.getSharedTasks(id);
  }
}


