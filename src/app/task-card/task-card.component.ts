import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Task } from '../models/task.model';
import { MoveCardDialogComponent } from '../move-card-dialog/move-card-dialog.component';
import { TaskDialogComponent } from '../task-card/task-dialog.component';
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
  @Input() availableColumns: string[] = ["To Do", "In Progress", "Review", "Done"];
  @Output() deleteTask = new EventEmitter<Task>();
  @Output() moveTask = new EventEmitter<{ task: Task, newColumn: string }>();

  constructor(private dialog: MatDialog) {}

  openCard() {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '600px',
      data: { task: this.task, columnName: this.columnName },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.description) {
        this.task.description = result.description;
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


  deleteCard() {
    console.log('Suppression de la tâche :', this.task);
    this.deleteTask.emit(this.task);
  }
}
