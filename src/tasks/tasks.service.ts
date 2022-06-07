import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.models';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task-dto';
import { GetTasksFilterDto } from './dto/get-task-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTask(): Task[] {
    return this.tasks;
  }

  getTasksWithFilter(filterDto: GetTasksFilterDto) {
    const { status, search } = filterDto;

    let tasks = this.getAllTask();

    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }

    if (search) {
      tasks = tasks.filter((task) => {
        if (task.title.includes(search) || task.description.includes(search)) {
          return true;
        }

        return false;
      });
    }

    return tasks;
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
