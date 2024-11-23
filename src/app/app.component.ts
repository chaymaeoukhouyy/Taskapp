import { Component } from '@angular/core';
import { NavbarComponent } from './navbar/navbar.component';  // Importer `NavbarComponent`
import { BoardComponent } from './board/board.component';     // Importer `BoardComponent`
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,  // Déclarez ce composant comme autonome
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [
    CommonModule,       // Pour les directives Angular courantes comme ngIf, ngFor
    NavbarComponent,    // Importer `NavbarComponent` pour qu'il soit reconnu
    BoardComponent      // Importer `BoardComponent` pour qu'il soit reconnu
  ]
})
export class AppComponent {
  title = 'task-app';
}
