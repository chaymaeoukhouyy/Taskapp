import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';  // Pour mat-card
import { MatButtonModule } from '@angular/material/button';  // Pour les boutons
import { MatInputModule } from '@angular/material/input';  // Pour matInput
import { FormsModule } from '@angular/forms';  // Pour ngModel

@Component({
  standalone: true,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    FormsModule  // Ajout du FormsModule pour ngModel
  ]
})
export class HomeComponent {
  newTaskTitle: string = '';  // Exemple de propriété pour ngModel

  // Méthode pour ajouter une tâche
  addTask(): void {
    if (this.newTaskTitle.trim()) {
      console.log(`Tâche ajoutée : ${this.newTaskTitle}`);
      // Ici, tu peux ajouter la logique pour ajouter la tâche à une liste, par exemple
      this.newTaskTitle = '';  // Réinitialiser le champ de saisie après l'ajout
    } else {
      console.log('Le titre de la tâche ne peut pas être vide.');
    }
  }
}
