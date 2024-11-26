import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Import du service Router
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  imports: [MatToolbarModule, MatButtonModule]
})
export class NavbarComponent {
  constructor(private router: Router) {} // Injection du Router

  onLogout() {
    console.log('User logged out');
    this.router.navigate(['/login']); // Redirection vers la page de connexion
  }
}
