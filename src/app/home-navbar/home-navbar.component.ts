import { Component , EventEmitter, Output , Input} from '@angular/core';
import { MatDialog } from '@angular/material/dialog'; // Pour le dialog
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { CreateProjectDialogComponent } from '../create-project-dialog/create-project-dialog.component';
import { NotificationsComponent } from '../notifications/notifications.component';
import { CommonModule } from '@angular/common'; // Ajoutez cet import

@Component({
  standalone: true,
  selector: 'app-home-navbar',
  templateUrl: './home-navbar.component.html',
  styleUrls: ['./home-navbar.component.scss'],
  imports: [
    CommonModule, // Ajoutez CommonModule ici
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    NotificationsComponent,
  ],
})
export class HomeNavbarComponent {
  @Input() projects: { name: string }[] = []; // Liste des projets disponibles (passée par le parent)
  @Output() projectSelected = new EventEmitter<{ name: string }>(); // Événement pour notifier le parent
  @Output() searchQueryChanged = new EventEmitter<string>();

  searchQuery: string = ''; // Ajout de cette propriété pour résoudre l'erreur
  showNotifications: boolean = false; // Propriété pour contrôler l'affichage des notifications
  filteredProjects: { name: string }[] = []; // Projets filtrés en fonction du texte de recherche

  constructor(private dialog: MatDialog) {}

  onSearchChange() {
    // Filtrer les projets en fonction du texte de recherche
    this.filteredProjects = this.projects.filter((project) =>
      project.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );

    // Émettre l'événement pour informer le parent
    this.searchQueryChanged.emit(this.searchQuery);
  }

  selectProject(project: { name: string }) {
    // Émet un événement pour informer le parent qu'un projet a été sélectionné
    this.projectSelected.emit(project);

    // Réinitialise la recherche
    this.searchQuery = '';
    this.filteredProjects = [];
  }


  onCreateTask() {
    const dialogRef = this.dialog.open(CreateProjectDialogComponent, {
      width: '400px', // Largeur du dialog
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Projet créé :', result);
      } else {
        console.log('Création annulée.');
      }
    });
  }
  toggleNotifications() {
    this.showNotifications = !this.showNotifications;
    console.log('Notifications toggled:', this.showNotifications);
  }
  
}