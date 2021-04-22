import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
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

  private checkLogin() {
    const loginStatus = localStorage.getItem('isLoggedIn');
    const loggedIn = loginStatus != null && loginStatus != undefined;
    this.isLoggedIn.next(loggedIn);
    //this.isLoggedIn = new BehaviorSubject<boolean>(loggedIn);
  }

  login(username: string, password: string): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      let isValidUser = false;
      this.indexedDbService.getAll<User>(EntityTypes.users).then((users) => {
        isValidUser = users.some((user) => user.username == username && user.password == password);
        this.logger.info('isValidUser: ', isValidUser);

        if (isValidUser) {
          localStorage.setItem('isLoggedIn', 'Yes');
          this.isLoggedIn.next(isValidUser);
        }

        resolve(isValidUser);
      });
    });
  }

  logout() {
    localStorage.clear();
    this.isLoggedIn.next(false);
  }
}
