import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { TaskStatus } from './task.models';
import { CreateTaskDto } from './dto/create-task-dto';
import { GetTasksFilterDto } from './dto/get-task-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { Repository } from 'typeorm';
import { User } from 'src/auth/user.entity';
import { Logger } from '@nestjs/common';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}
  private logger = new Logger('TaskService');

  async getTaskById(taskId: string, user: User): Promise<Task> {
    const task = await this.taskRepository.findOne({
      where: {
        id: taskId,
        user,
      },
    });

    if (!task) {
      throw new NotFoundException(`Task with id: ${taskId} not found!`);
    }

    return task;
  }

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const { title, description } = createTaskDto;

    const task = this.taskRepository.create({
      title,
      description,
      status: TaskStatus.OPEN,
      user,
    });
    await this.taskRepository.save(task);
    return task;
  }

  async deleteTask(taskId: string, user: User): Promise<Task> {
    const task = await this.taskRepository.findOne({
      where: { id: taskId, user },
    });
    if (!task) {
      throw new NotFoundException(`Task with id: ${taskId} not found!`);
    }
    const deletedTask = await this.taskRepository.remove(task);

    return deletedTask;
  }

  async getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
    const { status, search } = filterDto;

    const query = this.taskRepository.createQueryBuilder('task');
    query.where({ user });
    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    if (search) {
      query.andWhere(
        '(LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))',
        { search: `%${search}%` },
      );
    }
    try {
      const tasks = await query.getMany();
      return tasks;
    } catch (error) {
      this.logger.error(
        `Failed to get task for user ${
          user.username
        }. Filters: ${JSON.stringify(filterDto)}`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }
  }

  async updateTask(taskId, taskStatus: TaskStatus, user: User): Promise<Task> {
    const task = await this.getTaskById(taskId, user);
    task.status = taskStatus;

    await this.taskRepository.save(task);
    return task;
  }
}
