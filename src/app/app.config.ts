import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';

// Import des modules Angular Material nécessaires
import { MatCardModule } from '@angular/material/card';
import { DragDropModule } from '@angular/cdk/drag-drop';

// Import du module FormsModule pour que `ngModel` fonctionne
import { FormsModule } from '@angular/forms';

// Import des composants de votre application
import { BoardComponent } from './board/board.component';
import { ColumnComponent } from './column/column.component';
import { TaskCardComponent } from './task-card/task-card.component';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),         // Fournit les routes de l'application
    provideAnimations(),           // Fournit les animations d'Angular

    // Utiliser `importProvidersFrom()` pour importer les modules nécessaires
    importProvidersFrom(
      MatCardModule,      // Fournit <mat-card> et ses sous-composants à l'application
      DragDropModule,     // Fournit les fonctionnalités de drag-and-drop
      FormsModule         // Ajoutez FormsModule ici pour activer `ngModel`
    ),
  ],
};
