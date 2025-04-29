import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { StoreService } from './store.service';

describe('StoreService', () => {
  let storeService: StoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [StoreService]
    });
    storeService = TestBed.inject(StoreService);
  });

  it('should be created', () => {
    expect(storeService).toBeTruthy();
  });
});
