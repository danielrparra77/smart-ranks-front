import { TestBed } from '@angular/core/testing';

import { InvoiceService } from './invoice.service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { mockInvoice } from '../../../../test/mocks/invoice.mock';
import { environment } from '../../../environments/environment';

describe('InvoiceService', () => {
  let service: InvoiceService;
  let httpController: HttpTestingController;

  beforeEach(() => {
  TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
      ]
    });
    service = TestBed.inject(InvoiceService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getInvoices function', ()=>{
    const invoicesids = ['2342342-sdfsf'];
    it('should call getInvoices and return the data', () => {
      service.getInvoices().subscribe((res) => {
        expect(res).toEqual(invoicesids);
      });
      const req = httpController.expectOne({
        method: 'GET',
        url: `${environment.backService}invoice/ids`,
      });
      req.flush(invoicesids);
    });
    it('should call signIn and throw error', () => {
      spyOn(InvoiceService.prototype, "handleError").and.callThrough();
      service.getInvoices().subscribe({
        next: (data)=>{
          expect(InvoiceService.prototype.handleError).toHaveBeenCalledTimes(1);
          expect(data).not.toBeDefined();
        },
      });
      const req = httpController.expectOne({
        method: 'GET',
        url: `${environment.backService}invoice/ids`,
      });
      req.flush('404 error', { status: 404, statusText: 'Not Found' });
    });
  });

  describe('getInvoiceByID function', ()=>{
    const invoiceId = '2342342-sdfsf';
    it('should call getInvoices and return the data', () => {
      service.getInvoiceByID(invoiceId).subscribe((res) => {
        expect(res).toEqual(mockInvoice);
      });
      const req = httpController.expectOne({
        method: 'GET',
        url: `${environment.backService}invoice?id=${invoiceId}`,
      });
      req.flush(mockInvoice);
    });
    it('should call signIn and throw error', () => {
      spyOn(InvoiceService.prototype, "handleError").and.callThrough();
      service.getInvoiceByID(invoiceId).subscribe({
        next: (data)=>{
          expect(InvoiceService.prototype.handleError).toHaveBeenCalledTimes(1);
          expect(data).not.toBeDefined();
        },
      });
      const req = httpController.expectOne({
        method: 'GET',
        url: `${environment.backService}invoice?id=${invoiceId}`,
      });
      req.flush('404 error', { status: 404, statusText: 'Not Found' });
    });
  });
});
