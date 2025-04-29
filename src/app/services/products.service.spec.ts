import { TestBed } from '@angular/core/testing';
import { ProductsService } from './products.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ProductService', () => {
  let productsService: ProductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], 
      providers: [ProductsService]
    });
    productsService = TestBed.inject(ProductsService);
  });

  it('should be created', () => {
    expect(productsService).toBeTruthy();
  });
});
