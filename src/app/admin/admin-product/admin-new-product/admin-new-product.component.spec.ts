import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { AdminNewProductComponent } from './admin-new-product.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductService } from '../../../service/product/product.service';
import { findEl, setFieldValue } from '../../../../../test/spec-helpers/element.spec-helper';
import { mockProduct } from '../../../../../test/mocks/product.mock';
import { of } from 'rxjs';

describe('AdminNewProductComponent', () => {
  let component: AdminNewProductComponent;
  let fixture: ComponentFixture<AdminNewProductComponent>;

  let mockProductService: ProductService;
  let mockDialogRef:MatDialogRef<any, any>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminNewProductComponent],
      providers: [
        provideAnimations(),
        {
          provide: MatDialogRef,
          useValue: jasmine.createSpyObj('MatDialogRef', ['close'])
        },
        {
          provide: ProductService,
          useValue: jasmine.createSpyObj('ProductService', ['upsertProduct']),
        },
        {provide: MAT_DIALOG_DATA, useValue: { status: mockProduct.status}},
      ],
    })
    .compileComponents();

    mockProductService = TestBed.inject<ProductService>(
      ProductService,
    );
    mockDialogRef = TestBed.inject<MatDialogRef<any, any>>(MatDialogRef);
    fixture = TestBed.createComponent(AdminNewProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  const fillForm = (data:any) => {
    setFieldValue(fixture, 'name', data.name);
    setFieldValue(fixture, 'description', data.description);
    setFieldValue(fixture, 'price', data.price);
    setFieldValue(fixture, 'stock', data.stock);
    setFieldValue(fixture, 'status', data.status);
  };

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('submits the form successfully', fakeAsync(async () => {
    mockProductService.upsertProduct =
      jasmine.createSpy().and.returnValue(of(mockProduct));
    const rawData = {...mockProduct};

    fillForm(rawData);
    fixture.detectChanges();
    tick(1000);
    fixture.detectChanges();

    expect(findEl(fixture, 'submit').properties['disabled']).toBe(false);
    findEl(fixture, 'form').triggerEventHandler('submit', {});
    fixture.detectChanges();
    tick(1000);
    fixture.detectChanges();

    expect(mockDialogRef.close).toHaveBeenCalledTimes(1);
    expect(mockDialogRef.close).toHaveBeenCalledOnceWith(mockProduct);
  }));

  it('should submits the form but get service error', fakeAsync(async () => {
    mockProductService.upsertProduct =
      jasmine.createSpy().and.returnValue(of(null));
    const rawData = {...mockProduct};

    fillForm(rawData);
    fixture.detectChanges();
    tick(1000);
    fixture.detectChanges();

    expect(findEl(fixture, 'submit').properties['disabled']).toBe(false);
    findEl(fixture, 'form').triggerEventHandler('submit', {});
    fixture.detectChanges();
    tick(1000);
    fixture.detectChanges();

    expect(mockDialogRef.close).not.toHaveBeenCalled();
  }));

  it('should not submits the form invalid', fakeAsync(async () => {
    let mocklocal:any = {...mockProduct};
    mocklocal.name = '';
    const rawData = {...mocklocal};

    fillForm(rawData);
    fixture.detectChanges();
    tick(1000);
    fixture.detectChanges();

    expect(findEl(fixture, 'submit').properties['disabled']).toBe(false);
    findEl(fixture, 'form').triggerEventHandler('submit', {});
    fixture.detectChanges();
    tick(1000);
    fixture.detectChanges();

    expect(mockProductService.upsertProduct).not.toHaveBeenCalled();
  }));
});
