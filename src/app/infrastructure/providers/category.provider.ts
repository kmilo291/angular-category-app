import { InjectionToken } from '@angular/core';
import { CategoryRepository } from '../../core/ports/category-repository';
import { CategoryMockService } from '../adapters/category-mock.service';

export const CATEGORY_REPOSITORY = new InjectionToken<CategoryRepository>('CategoryRepository');

export const categoryProvider = {
  provide: CATEGORY_REPOSITORY,
  useClass: CategoryMockService
};
