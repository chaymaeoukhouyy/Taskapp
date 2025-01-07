import { Component } from '@angular/core';
import { Router } from '@angular/router'; 
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router'; 

@Component({
  standalone: true,
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  imports: [MatToolbarModule, MatButtonModule, RouterModule]
})
export class NavbarComponent {
  constructor(private router: Router) {} 

  onLogout() {
    console.log('User logged out');
    this.router.navigate(['/login']); 
  }
}
