import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { UserService } from './user.service';
import { mockCredential, mockSignInCredentials } from '../../../../test/mocks/credentials.mock';
import { environment } from '../../../environments/environment';
import { provideHttpClient } from '@angular/common/http';
import { mockUser } from '../../../../test/mocks/user.mock';

describe('UserService', () => {
  let service: UserService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
      ]
    });
    service = TestBed.inject(UserService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('signIn function', ()=>{
    it('should call signIn and return the data', () => {
      service.signIn(mockSignInCredentials).subscribe((res) => {
        expect(res).toEqual(mockCredential);
      });
      const req = httpController.expectOne({
        method: 'POST',
        url: `${environment.backService}user/login`,
      });
      req.flush(mockCredential);
    });
    it('should call signIn and throw error', () => {
      spyOn(UserService.prototype, "handleError").and.callThrough();
      service.signIn(mockSignInCredentials).subscribe({
        next: (data)=>{
          expect(UserService.prototype.handleError).toHaveBeenCalledTimes(1);
          expect(data).not.toBeDefined();
        },
      });
      const req = httpController.expectOne({
        method: 'POST',
        url: `${environment.backService}user/login`,
      });
      req.flush('404 error', { status: 404, statusText: 'Not Found' });
    });
  });

  describe('getUserbyId function', ()=>{
    const idUser = '1231-232-34345-545';
    it('should call getUserbyId and return the data', () => {
      service.getUserbyId(idUser).subscribe((res) => {
        expect(res).toEqual(mockUser);
      });
      const req = httpController.expectOne({
        method: 'GET',
        url: `${environment.backService}user/singular?_id=${idUser}`,
      });
      req.flush(mockUser);
    });
    it('should call getUserbyId and throw error', () => {
      spyOn(UserService.prototype, "handleError").and.callThrough();
      service.getUserbyId(idUser).subscribe({
        next: (data)=>{
          expect(UserService.prototype.handleError).toHaveBeenCalledTimes(1);
          expect(data).not.toBeDefined();
        },
      });
      const req = httpController.expectOne({
        method: 'GET',
        url: `${environment.backService}user/singular?_id=${idUser}`,
      });
      req.flush('404 error', { status: 404, statusText: 'Not Found' });
    });
  });

  describe('getUsers function', ()=>{
    const users = [mockUser];
    it('should call getUsers and return the data', () => {
      service.getUsers().subscribe((res) => {
        expect(res).toEqual(users);
      });
      const req = httpController.expectOne({
        method: 'GET',
        url: `${environment.backService}user`,
      });
      req.flush(users);
    });
    it('should call getUsers and throw error', () => {
      spyOn(UserService.prototype, "handleError").and.callThrough();
      service.getUsers().subscribe({
        next: (data)=>{
          expect(UserService.prototype.handleError).toHaveBeenCalledTimes(1);
          expect(data).not.toBeDefined();
        },
      });
      const req = httpController.expectOne({
        method: 'GET',
        url: `${environment.backService}user`,
      });
      req.flush('404 error', { status: 404, statusText: 'Not Found' });
    });
  });

  describe('upsertUser function', ()=>{
    it('should call upsertUser and return the data', () => {
      service.upsertUser(mockUser).subscribe((res) => {
        expect(res).toEqual(mockUser);
      });
      const req = httpController.expectOne({
        method: 'POST',
        url: `${environment.backService}user`,
      });
      req.flush(mockUser);
    });
    it('should call upsertUser and throw error', () => {
      spyOn(UserService.prototype, "handleError").and.callThrough();
      service.upsertUser(mockUser).subscribe({
        next: (data)=>{
          expect(UserService.prototype.handleError).toHaveBeenCalledTimes(1);
          expect(data).not.toBeDefined();
        },
      });
      const req = httpController.expectOne({
        method: 'POST',
        url: `${environment.backService}user`,
      });
      req.flush('404 error', { status: 404, statusText: 'Not Found' });
    });
  });
});
