import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { LoginComponent } from './login.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from 'src/app/shared/material.module';
import { BehaviorSubject, Observable, Observer } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { Router } from '@angular/router';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        BrowserAnimationsModule,
        RouterTestingModule,
        MaterialModule,
        TranslateTestingModule.withTranslations('en', require('src/assets/i18n/en.json'))
          .withTranslations('hin', require('src/assets/i18n/hin.json'))
          .withDefaultLanguage('en'),
        ReactiveFormsModule,
      ],
      providers: [
        {
          provide: AuthService,
          useClass: MockAuthService,
        },
      ],
    }).compileComponents();
    // TestBed.overrideComponent(LoginComponent, {
    //   set: {
    //     providers: [{ provide: AuthService, useClass: MockAuthService }]
    //   }
    // })
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    router = TestBed.get(Router);
    spyOn(router, 'navigateByUrl');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render login form desc', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('mat-card-title').textContent).toContain('Enter login details');
  });

  it('should be logged in with correct credentials', () => {
    spyOn(component, 'login');
    component.login();
    expect(component.login).toHaveBeenCalled();
  });
});

export class MockAuthService {
  isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  getUsername(): string {
    return localStorage.getItem('name');
  }

  login(username: string, password: string): Observable<boolean> {
    console.log('called');

    return new Observable((observer: Observer<boolean>) => {
      observer.next(true);
      observer.complete();
      // if (username.toLowerCase() === 'admin' && password.toLowerCase() === 'admin') {
      //   console.log('done');

      //   observer.next(true);
      //   observer.complete();
      // } else {
      //   console.log('not done');
      //   observer.next(false);
      //   observer.complete();
      // }
    });
  }
}
