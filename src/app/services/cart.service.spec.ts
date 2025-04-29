import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CartService } from './cart.service';

describe('CartService', () => {
  let cartService: CartService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CartService]
    });
    cartService = TestBed.inject(CartService);
  });

  it('should be created', () => {
    expect(cartService).toBeTruthy();
  });
});
