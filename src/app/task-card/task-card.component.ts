import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Task } from '../models/task.model';
import { TaskDialogComponent } from '../task-card/task-dialog.component';
import { MoveCardDialogComponent } from '../move-card-dialog/move-card-dialog.component'; // Importer le composant de déplacement
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  standalone: true,
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss'],
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatTooltipModule,
    MatMenuModule,
    MatButtonModule,
    MatDialogModule,
  ],
})
export class TaskCardComponent {
  @Input() task!: Task;
  @Input() columnName!: string;
  @Input() availableColumns: string[] = ["To Do", "In Progress", "Review", "Done"]; // Colonnes disponibles
  @Output() deleteTask = new EventEmitter<Task>();
  @Output() moveTask = new EventEmitter<{ task: Task, newColumn: string }>(); // Événement pour notifier le déplacement

  constructor(private dialog: MatDialog) {}

  openCard() {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '600px',
      data: { 
        task: this.task,
        columnName: this.columnName,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.task.description = result.description;

        if (this.task.description && this.task.description.trim() !== '') {
          console.log('Description mise à jour:', this.task.description);
        } else {
          console.log('Pas de description ajoutée.');
        }
      }
    });
  }

  openDescription() {
    this.dialog.open(TaskDialogComponent, {
      width: '400px',
      data: { 
        task: this.task,
        columnName: this.columnName,
        onlyDescription: true,
      },
    });
  }

  editDescription() {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '600px',
      data: { 
        task: this.task,
        columnName: this.columnName,
        onlyDescription: false,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.description !== undefined) {
        this.task.description = result.description;
        console.log('Description modifiée:', this.task.description);
      }
    });
  }

  moveCard() {
    const dialogRef = this.dialog.open(MoveCardDialogComponent, {
      width: '400px',
      data: {
        availableColumns: this.availableColumns.filter(col => col !== this.columnName),
      },
    });

    dialogRef.afterClosed().subscribe((selectedColumn) => {
      if (selectedColumn) {
        // Émettre l'événement pour informer le composant parent de déplacer la tâche
        this.moveTask.emit({ task: this.task, newColumn: selectedColumn });
      }
    });
}



  modifyDates() {
    console.log('Modify dates clicked', this.task);
  }

  deleteCard() {
    console.log('Delete card clicked', this.task);
    this.deleteTask.emit(this.task);
  }
}
