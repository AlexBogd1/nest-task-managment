import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { CreateTaskDto } from './dto/create-task-dto';
import { GetTasksFilterDto } from './dto/get-task-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status-dto';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get('/:id')
  getTaskById(@Param('id') id: string, @GetUser() user: User) {
    return this.taskService.getTaskById(id, user);
  }

  @Post()
  createTask(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.taskService.createTask(createTaskDto, user);
  }

  @Get()
  getTasks(
    @Query() filters: GetTasksFilterDto,
    @GetUser() user: User,
  ): Promise<Task[]> {
    return this.taskService.getTasks(filters, user);
  }

  @Patch('/:id/status')
  updateTask(
    @Param('id') id: string,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
    @GetUser() user: User,
  ): Promise<Task> {
    const { status } = updateTaskStatusDto;
    return this.taskService.updateTask(id, status, user);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string, @GetUser() user: User): Promise<Task> {
    return this.taskService.deleteTask(id, user);
  }
}
