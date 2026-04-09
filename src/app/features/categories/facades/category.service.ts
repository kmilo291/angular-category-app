import { Inject, Injectable } from '@angular/core';
import { CATEGORY_REPOSITORY } from '../../../infrastructure/providers/category.provider';
import { CategoryRepository } from '../../../core/ports/category-repository';
import { Category } from '../../../core/models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryFacade {

  constructor(
    @Inject(CATEGORY_REPOSITORY)
    private repo: CategoryRepository
  ) {}

  get categories$() {
    return this.repo.getAll();
  }

  create(category: Category) {
    return this.repo.create(category);
  }

  update(category: Category) {
    return this.repo.update(category);
  }

  delete(code: string) {
    return this.repo.delete(code);
  }

  toggleStatus(code: string) {
    return this.repo.toggleStatus(code);
  }
}
