import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.models';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task-dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTask(): Task[] {
    return this.tasks;
  }

  getTask(taskId: string): Task {
    return this.tasks.find(({ id }) => id === taskId);
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);
    return task;
  }

  updateTask(taskId, taskStatus: TaskStatus): Task {
    const task = this.getTask(taskId);
    task.status = taskStatus;
    return task;
  }

  deleteTask(taskId: string): Task {
    const deletedTask = this.tasks.find(({ id }) => id === taskId);
    this.tasks = this.tasks.filter(({ id }) => id !== taskId);
    return deletedTask;
  }
}
