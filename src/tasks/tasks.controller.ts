import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task-dto';
import { Task, TaskStatus } from './task.models';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  getAllTasks(): Task[] {
    return this.taskService.getAllTask();
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string) {
    return this.taskService.getTask(id);
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.taskService.createTask(createTaskDto);
  }

  @Patch('/:id/status')
  updateTask(
    @Param('id') id: string,
    @Body('status') taskStatus: TaskStatus,
  ): Task {
    return this.taskService.updateTask(id, taskStatus);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string) {
    return this.taskService.deleteTask(id);
  }
}
