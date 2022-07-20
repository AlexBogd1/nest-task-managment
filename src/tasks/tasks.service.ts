import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task.models';
import { CreateTaskDto } from './dto/create-task-dto';
import { GetTasksFilterDto } from './dto/get-task-filter.dto';
import { TasksRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksRepository)
    private taskRepository: TasksRepository,
  ) {}

  async getTaskById(taskId: string): Promise<Task> {
    const task = await this.taskRepository.findOne({
      where: {
        id: taskId,
      },
    });

    if (!task) {
      throw new NotFoundException(`Task with id: ${taskId} not found!`);
    }

    return task;
  }

  // getAllTask(): Task[] {
  //   return this.tasks;
  // }
  // getTasksWithFilter(filterDto: GetTasksFilterDto) {
  //   const { status, search } = filterDto;
  //   let tasks = this.getAllTask();
  //   if (status) {
  //     tasks = tasks.filter((task) => task.status === status);
  //   }
  //   if (search) {
  //     tasks = tasks.filter((task) => {
  //       if (task.title.includes(search) || task.description.includes(search)) {
  //         return true;
  //       }
  //       return false;
  //     });
  //   }
  //   return tasks;
  // }
  // getTask(taskId: string): Task {
  //   const found = this.tasks.find(({ id }) => id === taskId);
  //   if (!found) {
  //     throw new NotFoundException(`Task with id: ${taskId} not found!`);
  //   }
  //   return found;
  // }
  // createTask(createTaskDto: CreateTaskDto): Task {
  //   const { title, description } = createTaskDto;
  //   const task: Task = {
  //     id: uuid(),
  //     title,
  //     description,
  //     status: TaskStatus.OPEN,
  //   };
  //   this.tasks.push(task);
  //   return task;
  // }
  // updateTask(taskId, taskStatus: TaskStatus): Task {
  //   const task = this.getTask(taskId);
  //   task.status = taskStatus;
  //   return task;
  // }
  // deleteTask(taskId: string): Task {
  //   const deletedTask = this.getTask(taskId);
  //   this.tasks = this.tasks.filter(({ id }) => id !== taskId);
  //   return deletedTask;
  // }
}
