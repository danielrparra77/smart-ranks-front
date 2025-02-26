import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewUserProductCartComponent } from './new-user-product-cart.component';

describe('NewUserProductCartComponent', () => {
  let component: NewUserProductCartComponent;
  let fixture: ComponentFixture<NewUserProductCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewUserProductCartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewUserProductCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
