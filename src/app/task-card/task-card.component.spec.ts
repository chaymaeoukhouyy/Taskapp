import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskCardComponent } from './task-card.component';
import { MatCardModule } from '@angular/material/card';
import { By } from '@angular/platform-browser'; // Ajoutez cet import
import { Task } from '../models/task.model';

describe('TaskCardComponent', () => {
  let component: TaskCardComponent;
  let fixture: ComponentFixture<TaskCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskCardComponent],  // Utilisez `declarations` pour indiquer le composant à tester
      imports: [MatCardModule]            // Importez MatCardModule pour que le composant puisse utiliser MatCard
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Vérifier que le composant est créé correctement
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Test pour vérifier que le titre de la tâche est correctement affiché
  it('should display the task title', () => {
    const testTask: Task = { title: 'Test Title', description: 'Test Description' };
    component.task = testTask;
    fixture.detectChanges();

    const titleElement = fixture.debugElement.query(By.css('mat-card-title')).nativeElement;
    expect(titleElement.textContent).toContain('Test Title');
  });

  // Test pour vérifier que la description de la tâche est correctement affichée
  it('should display the task description', () => {
    const testTask: Task = { title: 'Test Title', description: 'Test Description' };
    component.task = testTask;
    fixture.detectChanges();

    const descriptionElement = fixture.debugElement.query(By.css('mat-card-content p')).nativeElement;
    expect(descriptionElement.textContent).toContain('Test Description');
  });

  // Test pour vérifier que la date d'échéance est correctement affichée
  it('should display the due date if provided', () => {
    const testDueDate = new Date('2024-12-31');
    const testTask: Task = { title: 'Test Title', description: 'Test Description', dueDate: testDueDate };
    component.task = testTask;
    fixture.detectChanges();

    const dueDateElement = fixture.debugElement.query(By.css('mat-card-subtitle')).nativeElement;
    expect(dueDateElement.textContent).toContain('Dec 31, 2024');
  });

  // Test pour vérifier que la date d'échéance n'est pas affichée si elle n'est pas définie
  it('should not display due date if not provided', () => {
    const testTask: Task = { title: 'Test Title', description: 'Test Description' };
    component.task = testTask;
    fixture.detectChanges();

    const dueDateElement = fixture.debugElement.query(By.css('mat-card-subtitle'));
    expect(dueDateElement).toBeNull();  // Il ne devrait pas y avoir d'élément <mat-card-subtitle>
  });
});
