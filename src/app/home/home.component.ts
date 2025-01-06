import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router'; // Import Router
import { MatDialog } from '@angular/material/dialog';
import { HomeNavbarComponent } from '../home-navbar/home-navbar.component';
import { CreateProjectDialogComponent } from '../create-project-dialog/create-project-dialog.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

interface Project {
  name: string;
  badge: string;
  deadline: string;
  progress: number;
}

@Component({
  standalone: true,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [
    MatIcon,
    HomeNavbarComponent,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    CommonModule,
  ],
})
export class HomeComponent implements AfterViewInit {
  @ViewChild('tasksProgressChart') chartCanvas!: ElementRef;

  stats = [
    { icon: 'assignment', count: 12, title: 'Open Tasks', description: 'Total open tasks', color: '#f4c430' },
    { icon: 'check_circle', count: 8, title: 'Completed Tasks', description: 'Tasks completed this month', color: '#28a745' },
    { icon: 'format_list_numbered', count: 20, title: 'Total Tasks', description: 'All tasks', color: '#007bff' },
    { icon: 'folder', count: 5, title: 'Projects', description: 'Total projects', color: '#6f42c1' },
  ];
  projects: Project[] = []; // Liste des projets conformes à l'interface Project
  filteredProjects: Project[] = [...this.projects]; // Liste filtrée des projets

  constructor(private dialog: MatDialog, private router: Router) {} // Inject Router

  ngAfterViewInit(): void {
    this.createDoughnutChart();
  }


   // Méthode appelée lorsqu'une recherche est effectuée
   onSearch(query: string) {
    this.filteredProjects = this.projects.filter((project) =>
      project.name.toLowerCase().includes(query.toLowerCase())
    );
  }

  openCreateProjectDialog() {
    const dialogRef = this.dialog.open(CreateProjectDialogComponent);
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const newProject: Project = {
          name: result.title, // Titre du projet
          badge: result.visibility === 'public' ? 'Public' : 'Private', // Public ou privé
          deadline: result.deadline || 'No deadline', // Ajoutez une deadline ou une valeur par défaut
          progress: 0, // Progression initialisée à 0
        };
  
        this.projects.push(newProject); // Ajoutez le projet à la liste principale
        this.filteredProjects = [...this.projects]; // Mettez à jour la liste filtrée
      }
    });
  }
  
  
 // Projet sélectionné
 onProjectSelected(project: { name: string }) {
  console.log('Naviguer vers le projet :', project.name);
  this.router.navigate(['/board'], { queryParams: { projectName: project.name } });
}
  navigateToBoard(project: Project): void {
    // Pass project information if needed
    this.router.navigate(['/board'], { queryParams: { projectName: project.name } });
  }

  private createDoughnutChart(): void {
    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Done', 'In Progress', 'To Do', 'Review'], // Catégories
        datasets: [
          {
            label: 'Tasks Progress',
            data: [8, 6, 4, 2], // Données des statistiques
            backgroundColor: ['#28a745', '#ffc107', '#007bff', '#dc3545'], // Couleurs
            hoverOffset: 4,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top', // Position de la légende
          },
        },
      },
    });
  }
}
