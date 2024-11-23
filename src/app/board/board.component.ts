import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Task } from '../models/task.model';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ColumnComponent } from '../column/column.component';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  imports: [
    DragDropModule,
    ColumnComponent,
    CommonModule
  ]
})
export class BoardComponent {
  todoTasks: Task[] = [
    { title: 'Tâche 1', dueDate: new Date() }  // Suppression de `description`
  ];
  doingTasks: Task[] = [
    { title: 'Tâche 2', dueDate: new Date() }  // Suppression de `description`
  ];
  reviewTasks: Task[] = [
    { title: 'Tâche 3', dueDate: new Date() }  // Suppression de `description`
  ];
  doneTasks: Task[] = [
    { title: 'Tâche 4', dueDate: new Date() }  // Suppression de `description`
  ];

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    }
  }
}
