import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { BoardComponent } from './board/board.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { HomeComponent } from './home/home.component';  // Importation du HomeComponent

export const routes: Routes = [
  { path: '', redirectTo: '/sign-up', pathMatch: 'full' },  // Redirection vers sign-up par défaut
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'board', component: BoardComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'home', component: HomeComponent },  // Route pour la page home
  { path: '**', redirectTo: '/sign-up' },  // Route par défaut pour toutes les autres URLs
];
