import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { UserCartComponent } from './user-cart.component';
import { ProductService } from '../../../service/product/product.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { mockCart } from '../../../../../test/mocks/cart.mock';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { mockInvoice } from '../../../../../test/mocks/invoice.mock';

describe('UserCartComponent', () => {
  let component: UserCartComponent;
  let fixture: ComponentFixture<UserCartComponent>;
  
  let mockDialogRef:MatDialogRef<any, any>;
  let mockProductService: ProductService;

  beforeEach(async () => {
    mockCart.products.push(mockCart.products[0]);
    await TestBed.configureTestingModule({
      imports: [UserCartComponent],
      providers: [        
        {
          provide: ProductService,
          useValue: jasmine.createSpyObj('ProductService', ['purchaseProduct']),
        },
        {
          provide: MatDialogRef,
          useValue: jasmine.createSpyObj('MatDialogRef', ['close'])
        },
        {provide: MAT_DIALOG_DATA, useValue: mockCart},
      ]
    })
    .compileComponents();

    mockDialogRef = TestBed.inject<MatDialogRef<any, any>>(MatDialogRef);

    mockProductService = TestBed.inject<ProductService>(
      ProductService,
    );

    fixture = TestBed.createComponent(UserCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should delete product', fakeAsync(async () => {
    component.deleteProduct(1);
    tick(1000);
    fixture.detectChanges();
    let listProducts1 = fixture.debugElement.query(By.css('.cart-products'));
    expect(listProducts1.children.length).toBe(1);
  }));

  it('should submit invoice', fakeAsync(async () => {
    mockProductService.purchaseProduct =
          jasmine.createSpy().and.returnValue(of(mockInvoice));
    let buttonSubmit = fixture.debugElement.query(By.css('.cart-submit'));
    buttonSubmit.nativeElement.click();
    component.deleteProduct(1);
    tick(1000);
    expect(mockDialogRef.close).toHaveBeenCalledTimes(1);
    expect(mockDialogRef.close).toHaveBeenCalledOnceWith(mockInvoice);
  }));

  it('should not submit without invoice', fakeAsync(async () => {
    mockProductService.purchaseProduct =
          jasmine.createSpy().and.returnValue(of(null));
    let buttonSubmit = fixture.debugElement.query(By.css('.cart-submit'));
    buttonSubmit.nativeElement.click();
    component.deleteProduct(1);
    tick(1000);
    expect(mockDialogRef.close).not.toHaveBeenCalled();
  }));
});
