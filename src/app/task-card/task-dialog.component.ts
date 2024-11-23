import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
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
    @Inject(MAT_DIALOG_DATA) public data: { task: any, columnName: string, onlyDescription?: boolean },
    public dialogRef: MatDialogRef<TaskDialogComponent>
  ) {
    if (data.task.description) {
      this.description = data.task.description;
    }
  }

  saveChanges(): void {
    this.dialogRef.close({ description: this.description });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
