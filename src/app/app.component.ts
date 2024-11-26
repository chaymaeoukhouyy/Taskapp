import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';  // Importer le composant Navbar
import { RouterModule } from '@angular/router'; // Pour le <router-outlet>

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [
    CommonModule,       
    RouterModule,       // Pour le routage avec <router-outlet>
    NavbarComponent     // Pour rendre Navbar conditionnellement
  ]
})
export class AppComponent {
  title = 'task-app';
  showNavbar = true;

  constructor(private router: Router) {
    // Écouter les événements de navigation pour afficher/masquer le navbar
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        // Cache le Navbar sur les pages de login et sign-up
        const hiddenNavbarRoutes = ['/login', '/sign-up','/reset-password'];
        this.showNavbar = !hiddenNavbarRoutes.includes(event.urlAfterRedirects);
      });
  }
}
