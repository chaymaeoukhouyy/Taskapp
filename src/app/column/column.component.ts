import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskCardComponent } from '../task-card/task-card.component';
import { Task } from '../models/task.model';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    TaskCardComponent,
  ]
})
export class ColumnComponent {
  @Input() title!: string;
  @Input() tasks!: Task[];
  @Output() moveTaskToBoard = new EventEmitter<{ task: Task, newColumn: string }>(); // Pour relayer vers BoardComponent

  isAddingCard: boolean = false;
  newCardTitle: string = '';

  // Fonction pour montrer l'interface d'ajout de nouvelle carte
  showAddCard() {
    this.isAddingCard = true;
  }

  // Fonction pour annuler l'ajout de nouvelle carte
  cancelAddCard() {
    this.isAddingCard = false;
    this.newCardTitle = '';
  }

  // Fonction pour ajouter une nouvelle tâche à la colonne
  addCard() {
    if (this.newCardTitle.trim() !== '') {
      const newTask: Task = {
        title: this.newCardTitle,
        dueDate: new Date() // Ajoutez une date d'échéance par défaut
      };
      this.tasks.push(newTask);
      this.newCardTitle = '';
      this.isAddingCard = false;
    }
  }

  // Fonction pour relayer l'événement de déplacement de tâche
  moveTask(event: { task: Task, newColumn: string }) {
    // Retirer la tâche de la colonne actuelle
    const taskIndex = this.tasks.indexOf(event.task);
    if (taskIndex > -1) {
      this.tasks.splice(taskIndex, 1);
    }

    // Émettre un événement vers BoardComponent pour déplacer la tâche
    this.moveTaskToBoard.emit(event);
    console.log(`Déplacer la tâche "${event.task.title}" vers la colonne "${event.newColumn}"`);
  }
  deleteTask(task: Task) {
    const index = this.tasks.indexOf(task);
    if (index > -1) {
      this.tasks.splice(index, 1);  // Supprime la tâche de la liste des tâches
      console.log(`Tâche "${task.title}" supprimée de la colonne "${this.title}"`);
    }
  }
  
}
