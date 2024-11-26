import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { BoardComponent } from './board/board.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';


export const routes: Routes = [
  { path: '', redirectTo: '/sign-up', pathMatch: 'full' }, 
  { path: 'login', component: LoginComponent }, 
  { path: 'sign-up', component: SignUpComponent }, 
  { path: 'board', component: BoardComponent }, 
  { path: 'reset-password', component: ResetPasswordComponent }, 
  { path: '**', redirectTo: '/sign-up' }, 
];
