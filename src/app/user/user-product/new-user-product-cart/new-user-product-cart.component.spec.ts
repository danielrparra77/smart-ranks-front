import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { NewUserProductCartComponent } from './new-user-product-cart.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { mockProductToCart } from '../../../../../test/mocks/cart.mock';
import { findEl, setFieldValue } from '../../../../../test/spec-helpers/element.spec-helper';

describe('NewUserProductCartComponent', () => {
  let component: NewUserProductCartComponent;
  let fixture: ComponentFixture<NewUserProductCartComponent>;

  let mockDialogRef:MatDialogRef<any, any>;

  const setup = async () => {  
    await TestBed.configureTestingModule({
      imports: [NewUserProductCartComponent],
      providers: [
        provideAnimations(),
        {
          provide: MatDialogRef,
          useValue: jasmine.createSpyObj('MatDialogRef', ['close'])
        },
        {provide: MAT_DIALOG_DATA, useValue: {...mockProductToCart}},
      ]
    })
    .compileComponents();

    mockDialogRef = TestBed.inject<MatDialogRef<any, any>>(MatDialogRef);

    fixture = TestBed.createComponent(NewUserProductCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  };

  const fillForm = (data:any) => {
    setFieldValue(fixture, 'number', data.number);
  };

  it('should create', fakeAsync(async () => {
    await setup();
    expect(component).toBeTruthy();
  }));

  it('submits the form successfully', fakeAsync(async () => {
    await setup();
    const rawData = {number: 1};

    fillForm(rawData);
    fixture.detectChanges();
    // Wait for async validators
    tick(1000);
    fixture.detectChanges();

    expect(findEl(fixture, 'submit').properties['disabled']).toBe(false);
    findEl(fixture, 'form').triggerEventHandler('submit', {});
    fixture.detectChanges();
    expect(mockDialogRef.close).toHaveBeenCalledTimes(1);
    expect(mockDialogRef.close).toHaveBeenCalledOnceWith(rawData);
  }));

  it('submits the form successfully fails if the stock is less than the form number', fakeAsync(async () => {
    await setup();
    const rawData = {number: mockProductToCart.product.stock + 1};

    fillForm(rawData);
    fixture.detectChanges();
    // Wait for async validators
    tick(1000);
    fixture.detectChanges();

    expect(findEl(fixture, 'submit').properties['disabled']).toBe(false);
    findEl(fixture, 'form').triggerEventHandler('submit', {});
    fixture.detectChanges();
    expect(mockDialogRef.close).not.toHaveBeenCalled();
  }));

  it('should leave modal', fakeAsync(async () => {
    await setup();
    const spyclick = spyOn(component, 'onNoClick');  
    let button = findEl(fixture, 'no-click');  ;
    button.nativeElement.click();
    tick(1000);
    fixture.detectChanges();
    expect(spyclick).toHaveBeenCalledTimes(1);
  }));
});
