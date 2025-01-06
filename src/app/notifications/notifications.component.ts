import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import du module CommonModule

@Component({
  standalone: true, // Rend le composant standalone
  selector: 'app-notification', // Assurez-vous que c'est bien "app-notification"
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
  imports: [CommonModule], // Ajout du CommonModule pour utiliser *ngFor

})
export class NotificationsComponent {
  notifications = [
    {
      userInitials: 'CO',
      message: 'user a mis à jour un ticket',
      time: 'il y a 2 semaines',
    },
    {
      userInitials: 'XX',
      message: 'User vous a assigné un ticket',
      time: 'il y a 4 semaines',
    },
  ];
}
