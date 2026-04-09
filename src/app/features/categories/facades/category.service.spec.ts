import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { CategoryFacade } from './category.service';
import { CATEGORY_REPOSITORY } from '../../../infrastructure/providers/category.provider';
import { CategoryRepository } from '../../../core/ports/category-repository';

describe('CategoryFacade', () => {
  let facade: CategoryFacade;
  let repoMock: jasmine.SpyObj<CategoryRepository>;

  beforeEach(() => {
    repoMock = jasmine.createSpyObj('CategoryRepository', [
      'getAll',
      'create',
      'update',
      'delete',
      'toggleStatus'
    ]);

    TestBed.configureTestingModule({
      providers: [
        CategoryFacade,
        { provide: CATEGORY_REPOSITORY, useValue: repoMock }
      ]
    });

    facade = TestBed.inject(CategoryFacade);
  });

  it('should load categories', (done) => {
    const mockData = [
      { code: '1', name: 'Test', description: '', status: true }
    ];

    repoMock.getAll.and.returnValue(of(mockData));

    facade.categories$.subscribe((data) => {
      expect(data.length).toBe(1);
      expect(data[0].code).toBe('1');
      done();
    });
  });

  it('should call delete on repository', () => {
    repoMock.delete.and.returnValue(of(void 0));

    facade.delete('1').subscribe();

    expect(repoMock.delete).toHaveBeenCalledWith('1');
  });
});