import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Task } from '../models/task.model';  // Assure-toi que Task est correctement importé
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@Component({
  standalone: true,
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
  ]
})
export class TaskDialogComponent {
  description: string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { task: Task, columnName: string, onlyDescription?: boolean },
    public dialogRef: MatDialogRef<TaskDialogComponent>
  ) {
    if (data.task.description) {
      this.description = data.task.description;
    }
  }

  // Sauvegarder la description après modification
  saveChanges(): void {
    this.dialogRef.close({ description: this.description });
  }

  // Fermer la boîte de dialogue sans modifier
  closeDialog(): void {
    this.dialogRef.close();
  }
}
