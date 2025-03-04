import { TestBed } from '@angular/core/testing';

import { ProductService } from './product.service';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { mockProduct } from '../../../../test/mocks/product.mock';
import { environment } from '../../../environments/environment';
import { mockCart } from '../../../../test/mocks/cart.mock';
import { mockInvoice } from '../../../../test/mocks/invoice.mock';

describe('ProductService', () => {
  let service: ProductService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
      ]
    });
    service = TestBed.inject(ProductService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  
  describe('getProducts function', ()=>{
    const products = [mockProduct];
    it('should call getProducts and return the data', () => {
      service.getProducts().subscribe((res) => {
        expect(res).toEqual(products);
      });
      const req = httpController.expectOne({
        method: 'GET',
        url: `${environment.backService}product`,
      });
      req.flush(products);
    });
    it('should call signIn and throw error', () => {
      spyOn(ProductService.prototype, "handleError").and.callThrough();
      service.getProducts().subscribe({
        next: (data)=>{
          expect(ProductService.prototype.handleError).toHaveBeenCalledTimes(1);
          expect(data).not.toBeDefined();
        },
      });
      const req = httpController.expectOne({
        method: 'GET',
        url: `${environment.backService}product`,
      });
      req.flush('404 error', { status: 404, statusText: 'Not Found' });
    });
  });
  
  describe('findByIds function', ()=>{
    const ids = [mockProduct.id];
    const products = [mockProduct];
    it('should call getProducts and return the data', () => {
      service.findByIds(ids).subscribe((res) => {
        expect(res).toEqual(products);
      });
      const req = httpController.expectOne({
        method: 'GET',
        url: `${environment.backService}product/ids?_id=${mockProduct.id}`,
      });
      req.flush(products);
    });
    it('should call findByIds and throw error', () => {
      spyOn(ProductService.prototype, "handleError").and.callThrough();
      service.findByIds(ids).subscribe({
        next: (data)=>{
          expect(ProductService.prototype.handleError).toHaveBeenCalledTimes(1);
          expect(data).not.toBeDefined();
        },
      });
      const req = httpController.expectOne({
        method: 'GET',
        url: `${environment.backService}product/ids?_id=${mockProduct.id}`,
      });
      req.flush('404 error', { status: 404, statusText: 'Not Found' });
    });
  });
  
  describe('purchaseProduct function', ()=>{
    it('should call purchaseProduct and return the data', () => {
      service.purchaseProduct(mockCart).subscribe((res) => {
        expect(res).toEqual(mockInvoice);
      });
      const req = httpController.expectOne({
        method: 'PUT',
        url: `${environment.backService}product`,
      });
      req.flush(mockInvoice);
    });
    it('should call purchaseProduct and throw error', () => {
      spyOn(ProductService.prototype, "handleError").and.callThrough();
      service.purchaseProduct(mockCart).subscribe({
        next: (data)=>{
          expect(ProductService.prototype.handleError).toHaveBeenCalledTimes(1);
          expect(data).not.toBeDefined();
        },
      });
      const req = httpController.expectOne({
        method: 'PUT',
        url: `${environment.backService}product`,
      });
      req.flush('404 error', { status: 404, statusText: 'Not Found' });
    });
  });
});
