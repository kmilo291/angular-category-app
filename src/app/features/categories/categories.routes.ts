import { Routes } from '@angular/router';
import { CategoryList } from '../../infrastructure/features/categories/pages/category-list/category-list';
import { CategoryForm } from './pages/category-form/category-form';

export const CATEGORIES_ROUTES: Routes = [
  {
    path: '',
    component: CategoryList
  },
  { path: 'new', component: CategoryForm },
  { path: ':id', component: CategoryForm }
];
