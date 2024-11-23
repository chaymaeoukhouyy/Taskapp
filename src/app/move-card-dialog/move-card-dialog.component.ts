import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-move-card-dialog',
  templateUrl: './move-card-dialog.component.html',
  styleUrls: ['./move-card-dialog.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatSelectModule,
  ],
})
export class MoveCardDialogComponent {
  selectedColumn: string = '';

  constructor(
    public dialogRef: MatDialogRef<MoveCardDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { availableColumns: string[] }
  ) {}

  moveCard(): void {
    // Ferme la boîte de dialogue et retourne la colonne sélectionnée
    this.dialogRef.close(this.selectedColumn);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
