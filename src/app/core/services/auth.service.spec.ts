import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { IndexedDbService } from './indexed-db.service';
import { LoggerService } from './logger.service';

describe('AuthService', () => {
  let service: AuthService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [IndexedDbService, LoggerService],
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be logged in with correct credentials', (done: DoneFn) => {
    service.login('admin', 'admin').subscribe((isLoggedIn: boolean) => {
      expect(isLoggedIn).toEqual(true);
      done();
    });
  });

  it('should not be logged in with incorrect credentials', (done: DoneFn) => {
    service.login('admin', 'wrong-password').subscribe((isLoggedIn: boolean) => {
      expect(isLoggedIn).toEqual(false);
      done();
    });
  });

  it('should return name as null if not logged in', () => {
    service.logout();
    const name = service.getUsername();
    expect(name).toEqual(null);
  });

  it('should return name if logged in', (done: DoneFn) => {
    service.login('admin', 'admin').subscribe((isLoggedIn: boolean) => {
      const name = service.getUsername();
      expect(name).toEqual('Deepak');
      done();
    });
  });

  it('should logout and remove flag from local storage', () => {
    service.logout();
    expect(localStorage.getItem('isLoggedIn')).toEqual(null);
  });
});
