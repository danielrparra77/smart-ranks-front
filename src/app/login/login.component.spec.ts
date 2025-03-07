import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { UserService } from '../service/user/user.service';
import { findEl, setFieldValue } from '../../../test/spec-helpers/element.spec-helper';
import { of } from 'rxjs';
import { mockCredential } from '../../../test/mocks/credentials.mock';
import { provideAnimations } from '@angular/platform-browser/animations';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  let mockUserService: UserService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [
        provideAnimations(),
        {
          provide: UserService,
          useValue: jasmine.createSpyObj('UserService', ['signIn']),
        },
      ]
    })
    .compileComponents();
    mockUserService = TestBed.inject<UserService>(
      UserService,
    );
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  const fillForm = (data:any) => {
    setFieldValue(fixture, 'email', data.email);
    setFieldValue(fixture, 'password', data.password);
  };

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('submits the form successfully with valid credentials', fakeAsync(async () => {
    mockUserService.signIn =
          jasmine.createSpy().and.returnValue(of(mockCredential));
    const rawData = {email: 'correo@correo.com', password: '123cfgf'};
    const spySetCredentials = spyOn(component, 'setCredentials');  
    fillForm(rawData);
    fixture.detectChanges();
    // Wait for async validators
    tick(1000);
    fixture.detectChanges();

    expect(findEl(fixture, 'submit').properties['disabled']).toBe(false);
    findEl(fixture, 'form').triggerEventHandler('submit', {});
    fixture.detectChanges();
    expect(mockUserService.signIn).toHaveBeenCalledTimes(1);
    expect(spySetCredentials).toHaveBeenCalledTimes(1);
  }));

  it('submits the form successfully with invalid credentials', fakeAsync(async () => {
    mockUserService.signIn =
          jasmine.createSpy().and.returnValue(of(null));
    const rawData = {email: 'correo@correo.com', password: '123cfgf'};
    const spySetCredentials = spyOn(component, 'setCredentials');  
    fillForm(rawData);
    fixture.detectChanges();
    // Wait for async validators
    tick(1000);
    fixture.detectChanges();

    expect(findEl(fixture, 'submit').properties['disabled']).toBe(false);
    findEl(fixture, 'form').triggerEventHandler('submit', {});
    fixture.detectChanges();
    expect(mockUserService.signIn).toHaveBeenCalledTimes(1);
    expect(spySetCredentials).not.toHaveBeenCalled();
  }));

  it('should not submits the form because of email format', fakeAsync(async () => {
    mockUserService.signIn =
          jasmine.createSpy().and.returnValue(of(null));
    const rawData = {email: 'correo', password: '123cfgf'};
    const spySetCredentials = spyOn(component, 'setCredentials');  
    fillForm(rawData);
    fixture.detectChanges();
    // Wait for async validators
    tick(1000);
    fixture.detectChanges();

    expect(findEl(fixture, 'submit').properties['disabled']).toBe(false);
    findEl(fixture, 'form').triggerEventHandler('submit', {});
    fixture.detectChanges();
    expect(mockUserService.signIn).not.toHaveBeenCalled();
    expect(spySetCredentials).not.toHaveBeenCalled();
  }));

  it('should not submits the form because of password format', fakeAsync(async () => {
    mockUserService.signIn =
          jasmine.createSpy().and.returnValue(of(null));
    const rawData = {email: 'correo@correo.com', password: ''};
    const spySetCredentials = spyOn(component, 'setCredentials');  
    fillForm(rawData);
    fixture.detectChanges();
    // Wait for async validators
    tick(1000);
    fixture.detectChanges();

    expect(findEl(fixture, 'submit').properties['disabled']).toBe(false);
    findEl(fixture, 'form').triggerEventHandler('submit', {});
    fixture.detectChanges();
    expect(mockUserService.signIn).not.toHaveBeenCalled();
    expect(spySetCredentials).not.toHaveBeenCalled();
  }));
});
