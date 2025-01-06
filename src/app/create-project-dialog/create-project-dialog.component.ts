import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  standalone: true,
  selector: 'app-create-project-dialog',
  templateUrl: './create-project-dialog.component.html',
  styleUrls: ['./create-project-dialog.component.scss'],
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    FormsModule,
  ],
})
export class CreateProjectDialogComponent {
  projectTitle: string = '';
  visibility: string = 'private';

  constructor(private dialogRef: MatDialogRef<CreateProjectDialogComponent>) {}

  createProject() {
    if (this.projectTitle.trim()) {
      this.dialogRef.close({ title: this.projectTitle, visibility: this.visibility });
    } else {
      console.log('Veuillez fournir un titre valide');
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
