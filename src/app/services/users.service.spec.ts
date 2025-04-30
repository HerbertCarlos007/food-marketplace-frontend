import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { UsersService } from './users.service';
import { mockUsers } from '../mocks/user.mock';
import { environment } from '../../environments/environments';

describe('UsersService', () => {
  let userService: UsersService;
  let httpMock: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UsersService, provideHttpClientTesting()]
    });
    userService = TestBed.inject(UsersService);
    httpMock = TestBed.inject(HttpTestingController)
  });

  afterEach(() => {
    httpMock.verify()
  })

  it('should be created', () => {
    expect(userService).toBeTruthy();
  });

  it('Deve retornar todos os usuários', () => {
    userService.getAllUsers().subscribe((users) => {
      expect(users.length).toBe(4)
      expect(users).toEqual(mockUsers)
    })
     const req = httpMock.expectOne(`${environment.baseApiUrl}api/user`);
     expect(req.request.method).toBe('GET')
     req.flush(mockUsers)
  })
});
