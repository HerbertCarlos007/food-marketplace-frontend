import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let userService: UsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // ✅ Aqui
      providers: [UsersService]
    });
    userService = TestBed.inject(UsersService);
  });

  it('should be created', () => {
    expect(userService).toBeTruthy();
  });
});
