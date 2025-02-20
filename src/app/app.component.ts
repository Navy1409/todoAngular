import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


interface TodoType {
  title: string;
  desc: string;
  date: string;
  priority: string;
  taskType: string;
  completed: boolean;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  task: TodoType = { title: '', desc: '', date: '', priority: '', taskType: '', completed: false };
  workTasks: TodoType[] = [];
  personalTasks: TodoType[] = [];
  minDate: string = '';

  constructor() {
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0]; // Format date as YYYY-MM-DD
  }

  addTask() {
    if (this.task.title && this.task.desc && this.task.date && this.task.priority && this.task.taskType) {
      const newTask: TodoType = { ...this.task, completed: false };

      if (this.task.taskType === 'Work') {
        this.workTasks.push(newTask);
      } else {
        this.personalTasks.push(newTask);
      }

      this.sortTasks();
      this.task = { title: '', desc: '', date: '', priority: '', taskType: '', completed: false };
    } else {
      alert('Please fill in all required fields!');
    }
  }

  toggleTaskCompletion(task: TodoType) {
    task.completed = !task.completed;
    this.sortTasks();
  }

  sortTasks() {
    this.workTasks.sort((a, b) => this.compareTasks(a, b));
    this.personalTasks.sort((a, b) => this.compareTasks(a, b));
  }

  compareTasks(a: TodoType, b: TodoType) {
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  }
  deleteTask(task: TodoType, type: string) {
    if (type === 'Work') {
      this.workTasks = this.workTasks.filter(t => t !== task);
    } else {
      this.personalTasks = this.personalTasks.filter(t => t !== task);
    }
  }
  editTask(task: TodoType) {
    this.task = { ...task }; 
    this.deleteTask(task, task.taskType); 
  }
  openDatePicker() {
    const dateInput = document.querySelector('input[type="date"]') as HTMLInputElement;
    if (dateInput) {
      dateInput.showPicker(); // Opens the native date picker
    }
  }  
  
  
}
