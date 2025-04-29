import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoginService } from './login.service';

describe('LoginService', () => {
  let loginService: LoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // ✅ Aqui
      providers: [LoginService]
    });
    loginService = TestBed.inject(LoginService);
  });

  it('should be created', () => {
    expect(loginService).toBeTruthy();
  });
});
