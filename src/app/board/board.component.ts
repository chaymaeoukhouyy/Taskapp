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
  // Définition des différentes colonnes de tâches
  todoTasks: Task[] = [
    { title: 'Tâche 1', dueDate: new Date() }  // Exemple de tâche sans description
  ];
  doingTasks: Task[] = [
    { title: 'Tâche 2', dueDate: new Date() }  // Exemple de tâche sans description
  ];
  reviewTasks: Task[] = [
    { title: 'Tâche 3', dueDate: new Date() }  // Exemple de tâche sans description
  ];
  doneTasks: Task[] = [
    { title: 'Tâche 4', dueDate: new Date() }  // Exemple de tâche sans description
  ];

  // Fonction pour gérer le glisser-déposer d'une tâche entre les colonnes
  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    }
  }

  // Fonction appelée pour déplacer une tâche vers une nouvelle colonne
  moveTaskToColumn(task: Task, newColumnName: string): void {
    // Retirer la tâche de la colonne actuelle
    this.removeTaskFromCurrentColumn(task);

    // Ajouter la tâche à la nouvelle colonne
    switch (newColumnName) {
      case 'To Do':
        this.todoTasks.push(task);
        break;
      case 'In Progress':
        this.doingTasks.push(task);
        break;
      case 'Review':
        this.reviewTasks.push(task);
        break;
      case 'Done':
        this.doneTasks.push(task);
        break;
      default:
        console.error('Colonne inconnue:', newColumnName);
    }
  }

  // Fonction utilisée pour retirer la tâche de la colonne actuelle
  removeTaskFromCurrentColumn(task: Task): void {
    // Pour chaque colonne de tâches, vérifier si la tâche est présente et la retirer si nécessaire
    [this.todoTasks, this.doingTasks, this.reviewTasks, this.doneTasks].forEach(taskArray => {
      const index = taskArray.indexOf(task);
      if (index > -1) {
        taskArray.splice(index, 1);
      }
    });
  }
}
