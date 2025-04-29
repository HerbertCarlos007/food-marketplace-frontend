import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AppearanceService } from './appearance.service';

describe('AppearanceService', () => {
  let appearanceService: AppearanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // ✅ Aqui
      providers: [AppearanceService]
    });
    appearanceService = TestBed.inject(AppearanceService);
  });

  it('should be created', () => {
    expect(appearanceService).toBeTruthy();
  });
});
