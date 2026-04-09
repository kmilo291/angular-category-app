import { Observable } from 'rxjs';
import { Category } from '../models/category.model';

export interface CategoryRepository {
  getAll(): Observable<Category[]>;
  create(category: Category): Observable<void>;
  update(category: Category): Observable<void>;
  toggleStatus(code: string): Observable<void>;
  delete(code: string): Observable<void>;
}
