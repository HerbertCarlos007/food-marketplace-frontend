import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CreateStoreService } from './create-store.service';

describe('CreateStoreService', () => {
  let createStoreService: CreateStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // ✅ Aqui
      providers: [CreateStoreService]
    });
    createStoreService = TestBed.inject(CreateStoreService);
  });

  it('should be created', () => {
    expect(createStoreService).toBeTruthy();
  });
});
