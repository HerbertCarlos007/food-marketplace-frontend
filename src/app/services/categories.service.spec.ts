import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CategoriesService } from './categories.service';

describe('CategoriesService', () => {
  let categoriesService: CategoriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // ✅ Aqui
      providers: [CategoriesService]
    });
    categoriesService = TestBed.inject(CategoriesService);
  });

  it('should be created', () => {
    expect(categoriesService).toBeTruthy();
  });
});
