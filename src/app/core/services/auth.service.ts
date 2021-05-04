import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Observer } from 'rxjs';
import { EntityTypes } from '../constants';
import { User } from '../models/user';
import { IndexedDbService } from './indexed-db.service';
import { LoggerService } from './logger.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private readonly indexedDbService: IndexedDbService, private readonly logger: LoggerService) {
    this.checkLogin();
  }

  private checkLogin(): void {
    const loginStatus = localStorage.getItem('isLoggedIn');
    const loggedIn = loginStatus !== null && loginStatus !== undefined;
    this.isLoggedIn.next(loggedIn);
  }

  getUsername(): string {
    return localStorage.getItem('name');
  }

  login(username: string, password: string): Observable<boolean> {
    return new Observable((observer: Observer<boolean>) => {
      let isValidUser = false;
      this.indexedDbService.getAll<User>(EntityTypes.users).subscribe(
        (users) => {
          const user = users.find((usr) => usr.username === username && usr.password === password);
          isValidUser = user !== null && user !== undefined;
          this.logger.info('isValidUser: ', isValidUser);

          if (isValidUser) {
            localStorage.setItem('isLoggedIn', 'Yes');
            localStorage.setItem('name', user.firstName);
            this.isLoggedIn.next(isValidUser);
          }

          observer.next(isValidUser);
        },
        (error) => {
          observer.error(error);
        }
      );
    });
  }

  logout(): void {
    localStorage.clear();
    this.isLoggedIn.next(false);
  }
}
