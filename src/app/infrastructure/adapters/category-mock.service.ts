import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Category } from '../../core/models/category.model';
import { CategoryRepository } from '../../core/ports/category-repository';

@Injectable()
export class CategoryMockService implements CategoryRepository {

  private categories$ = new BehaviorSubject<Category[]>([
    {
      code: 'CAT-001',
      name: 'Tecnología',
      description: 'Productos tecnológicos',
      status: true
    },
    {
      code: 'CAT-002',
      name: 'Hogar',
      description: 'Artículos para el hogar',
      status: false
    }
  ]);

  getAll(): Observable<Category[]> {
    return this.categories$.asObservable();
  }

  create(category: Category): Observable<void> {
    const current = this.categories$.value;
    this.categories$.next([...current, category]);
    return of(void 0);
  }

  update(category: Category): Observable<void> {
    const updated = this.categories$.value.map(c =>
      c.code === category.code ? category : c
    );
    this.categories$.next(updated);
    return of(void 0);
  }

  delete(code: string) {
    const current = this.categories$.value;
    const updated = current.filter(c => c.code !== code);
    this.categories$.next(updated);
    return of(void 0);
  }

  toggleStatus(code: string): Observable<void> {
    const updated = this.categories$.value.map(c =>
      c.code === code ? { ...c, status: !c.status } : c
    );
    this.categories$.next(updated);
    return of(void 0);
  }
}
