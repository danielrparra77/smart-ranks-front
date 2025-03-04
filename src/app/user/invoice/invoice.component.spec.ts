import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceComponent } from './invoice.component';
import { InvoiceService } from '../../service/invoice/invoice.service';
import { ProductService } from '../../service/product/product.service';
import { UserService } from '../../service/user/user.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { of } from 'rxjs';
import { mockInvoice } from '../../../../test/mocks/invoice.mock';
import { mockUser } from '../../../../test/mocks/user.mock';
import { mockProduct } from '../../../../test/mocks/product.mock';
import { By } from '@angular/platform-browser';

describe('InvoiceComponent', () => {
  let component: InvoiceComponent;
  let fixture: ComponentFixture<InvoiceComponent>;

  let mockInvoiceService: InvoiceService;
  let mockProductService: ProductService;
  let mockUserService: UserService;

  let testBedModule: any;

  beforeEach(async () => {
    mockInvoice.id = '1c5b3dec-d2e2-45cb-8754-a12d24191001';
    testBedModule = {
      imports: [InvoiceComponent],
      providers: [
        {
          provide: InvoiceService,
          useValue: jasmine.createSpyObj('InvoiceService', ['getInvoiceByID']),
        },
        {
          provide: ProductService,
          useValue: jasmine.createSpyObj('ProductService', ['findByIds']),
        },
        {
          provide: UserService,
          useValue: jasmine.createSpyObj('UserService', ['getUserbyId']),
        },
        {
          provide: MatDialogRef,
          useValue: jasmine.createSpyObj('MatDialogRef', ['close'])
        },
        {provide: MAT_DIALOG_DATA, useValue: []},
      ],
    };
  });

  function initServicesSpies() {
    mockInvoiceService = TestBed.inject<InvoiceService>(
      InvoiceService,
    );
    mockInvoiceService.getInvoiceByID =
      jasmine.createSpy().and.returnValue(of(mockInvoice));
    mockUserService = TestBed.inject<UserService>(
      UserService,
    );
    mockUserService.getUserbyId =
      jasmine.createSpy().and.returnValue(of(mockUser));
    mockProductService = TestBed.inject<ProductService>(
      ProductService,
    );
    mockProductService.findByIds =
      jasmine.createSpy().and.returnValue(of([mockProduct, mockProduct]));
  }
  
  describe('invoice for admin user', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: testBedModule.imports,
        providers: [
          ...testBedModule.providers,
          {
            provide: MAT_DIALOG_DATA,
            useValue: {
              invoiceData: undefined,
              id: '1234567',
            },
          },
        ],
      })
      .compileComponents();
      initServicesSpies();
      fixture = TestBed.createComponent(InvoiceComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      expect(mockInvoiceService.getInvoiceByID).toHaveBeenCalledTimes(1);
      expect(mockUserService.getUserbyId).toHaveBeenCalledTimes(1);
      expect(mockProductService.findByIds).toHaveBeenCalledTimes(1);
    });
  
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should print invoice data', () => {
      fixture.detectChanges();
      let cardTitle: HTMLElement = fixture.nativeElement.querySelector('mat-card-title');
      expect(cardTitle.textContent).toEqual(`Invoice number: ${mockInvoice.id}`);
      let cardSubTitle: HTMLElement = fixture.nativeElement.querySelector('mat-card-subtitle');
      expect(cardSubTitle.textContent).toEqual(`Customer: ${mockUser.name}`);
      let listProducts = fixture.debugElement.query(By.css('mat-card-content .invoice-product'));
      expect(listProducts.children.length).toBe(2);
    });
  });
  
  describe('invoice for user user', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: testBedModule.imports,
        providers: [
          ...testBedModule.providers,
          {
            provide: MAT_DIALOG_DATA,
            useValue: {
              invoiceData: mockInvoice,
              id: undefined,
            },
          },
        ],
      })
      .compileComponents();
      initServicesSpies();
      fixture = TestBed.createComponent(InvoiceComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      expect(mockInvoiceService.getInvoiceByID).toHaveBeenCalledTimes(0);
      expect(mockUserService.getUserbyId).toHaveBeenCalledTimes(1);
      expect(mockProductService.findByIds).toHaveBeenCalledTimes(1);
    });
  
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should print invoice data', () => {
      fixture.detectChanges();
      let cardTitle: HTMLElement = fixture.nativeElement.querySelector('mat-card-title');
      expect(cardTitle.textContent).toEqual(`Invoice number: ${mockInvoice.id}`);
      let cardSubTitle: HTMLElement = fixture.nativeElement.querySelector('mat-card-subtitle');
      expect(cardSubTitle.textContent).toEqual(`Customer: ${mockUser.name}`);
      let listProducts = fixture.debugElement.query(By.css('mat-card-content .invoice-product'));
      expect(listProducts.children.length).toBe(2);
    });

    it('should leave modal', (async () => {
      const spyclick = spyOn(component, 'onNoClick');  
      let button = fixture.nativeElement.querySelector('button');
      button.click();
      fixture.whenStable().then(() => {
        expect(spyclick).toHaveBeenCalledTimes(1);
      });
    }));
  });
});
