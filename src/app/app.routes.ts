import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'categories',
    pathMatch: 'full'
  },
  {
    path: 'categories',
    loadChildren: () =>
      import('./features/categories/categories.routes')
        .then(m => m.CATEGORIES_ROUTES)
  }
];
