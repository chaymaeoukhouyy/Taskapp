import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ColumnComponent } from './column.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { Task } from '../models/task.model';

describe('ColumnComponent', () => {
  let component: ColumnComponent;
  let fixture: ComponentFixture<ColumnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ColumnComponent],  // Utilisez `declarations` pour indiquer quel composant tester
      imports: [DragDropModule]          // Ajoutez ici le module DragDrop pour la fonctionnalité de drag-and-drop
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
