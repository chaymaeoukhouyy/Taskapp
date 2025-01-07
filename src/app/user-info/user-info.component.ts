import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common'; // Importer CommonModule

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
  standalone: true,
  imports: [
    CommonModule, // Ajoutez CommonModule pour utiliser *ngIf
    ReactiveFormsModule, // Importer ReactiveFormsModule pour le formulaire réactif
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
  ],
})
export class UserInfoComponent {
  userInfoForm: FormGroup;
  showPasswordInput = false; // Par défaut, le champ de mot de passe est masqué

  constructor(private fb: FormBuilder) {
    this.userInfoForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: [''], // Champ vide pour le nouveau mot de passe
    });
    console.log('Initial showPasswordInput:', this.showPasswordInput);

  }

  togglePasswordInput() {
    this.showPasswordInput = !this.showPasswordInput; // Basculer entre true et false
    console.log('Toggle Password Input:', this.showPasswordInput); // Ajouter un log pour voir si la valeur change
  }
  

  onSave() {
    if (this.userInfoForm.valid) {
      console.log('Form Data:', this.userInfoForm.value);
      alert('User information saved successfully!');
    } else {
      alert('Please fill in all required fields.');
    }
  }
}
