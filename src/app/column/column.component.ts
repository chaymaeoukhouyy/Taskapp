import { Component, Input } from '@angular/core';
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
    TaskCardComponent
  ]
})
export class ColumnComponent {
  @Input() title!: string;
  @Input() tasks!: Task[];

  isAddingCard: boolean = false;
  newCardTitle: string = '';

  showAddCard() {
    this.isAddingCard = true;
  }

  cancelAddCard() {
    this.isAddingCard = false;
    this.newCardTitle = '';
  }

  addCard() {
    if (this.newCardTitle.trim() !== '') {
      const newTask: Task = {
        title: this.newCardTitle,
        // Notez qu'on n'ajoute pas `description`, elle sera donc undefined par défaut
        dueDate: new Date() // Ajustez cette logique si nécessaire
      };
      this.tasks.push(newTask);
      this.newCardTitle = '';
      this.isAddingCard = false;
    }
  }
  // Nouvelle méthode pour gérer le déplacement d'une carte vers une autre colonne
  moveTask(event: { task: Task, newColumn: string }) {
    // Retirer la tâche de la colonne actuelle
    const taskIndex = this.tasks.indexOf(event.task);
    if (taskIndex > -1) {
      this.tasks.splice(taskIndex, 1);
    }

    // Logique pour déplacer la tâche vers une nouvelle colonne
    // Vous pouvez émettre un événement au niveau du composant parent (par exemple, BoardComponent)
    console.log(`Déplacer la tâche "${event.task.title}" vers la colonne "${event.newColumn}"`);
  }
}
