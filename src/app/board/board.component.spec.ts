import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BoardComponent } from './board.component';
import { ColumnComponent } from '../column/column.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { By } from '@angular/platform-browser';

describe('BoardComponent', () => {
  let component: BoardComponent;
  let fixture: ComponentFixture<BoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        BoardComponent,    // Déclarez le composant à tester
        ColumnComponent    // Déclarez les composants enfants nécessaires
      ],
      imports: [
        DragDropModule     // Importez le module nécessaire pour le drag-and-drop
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Test pour vérifier que le composant est bien créé
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Test pour vérifier que les colonnes sont rendues correctement
  it('should render three columns', () => {
    const columnComponents = fixture.debugElement.queryAll(By.directive(ColumnComponent));
    expect(columnComponents.length).toBe(3);
  });

  // Test pour vérifier que les tâches sont passées correctement aux colonnes
  it('should pass tasks to each column', () => {
    component.todoTasks = [
      { title: 'Tâche 1', description: 'Description 1' }
    ];
    component.doingTasks = [
      { title: 'Tâche 2', description: 'Description 2' }
    ];
    component.doneTasks = [
      { title: 'Tâche 3', description: 'Description 3' }
    ];
    fixture.detectChanges(); // Déclencher la mise à jour

    const columnComponents = fixture.debugElement.queryAll(By.directive(ColumnComponent));

    // Vérifier que chaque colonne reçoit bien les tâches
    expect(columnComponents[0].componentInstance.tasks.length).toBe(1);
    expect(columnComponents[0].componentInstance.tasks[0].title).toBe('Tâche 1');

    expect(columnComponents[1].componentInstance.tasks.length).toBe(1);
    expect(columnComponents[1].componentInstance.tasks[0].title).toBe('Tâche 2');

    expect(columnComponents[2].componentInstance.tasks.length).toBe(1);
    expect(columnComponents[2].componentInstance.tasks[0].title).toBe('Tâche 3');
  });
});
