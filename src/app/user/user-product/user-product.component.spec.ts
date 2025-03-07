import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { UserProductComponent } from './user-product.component';
import { ProductService } from '../../service/product/product.service';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { mockProduct } from '../../../../test/mocks/product.mock';
import { By } from '@angular/platform-browser';
import { mockInvoice } from '../../../../test/mocks/invoice.mock';

describe('UserProductComponent', () => {
  let component: UserProductComponent;
  let fixture: ComponentFixture<UserProductComponent>;
  let mockProductService: ProductService;
  let mockMatDialog: MatDialog;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserProductComponent],
      providers: [
        {
          provide: ProductService,
          useValue: jasmine.createSpyObj('ProductService', ['getProducts']),
        },
        {
          provide: MatDialog,
          useValue: jasmine.createSpyObj('MatDialog', ['open']),
        },
      ]
    })
    .compileComponents();

    mockProductService = TestBed.inject<ProductService>(
      ProductService,
    );
    mockMatDialog = TestBed.inject<MatDialog>(
      MatDialog,
    );
    mockProductService.getProducts =
      jasmine.createSpy().and.returnValue(of([mockProduct]));
  
    fixture = TestBed.createComponent(UserProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render table', fakeAsync(async ()=> {
    fixture.detectChanges();
    tick(1000);
    fixture.detectChanges();
    
    expect(component.products.data.length).toBe(1);
    let tableRows = fixture.nativeElement.querySelectorAll('tr');
    expect(tableRows.length).toBe(2);
    // Header row
    let headerRow = tableRows[0];
    expect(headerRow.cells[0].innerHTML.trim()).toBe('Name');
    expect(headerRow.cells[1].innerHTML.trim()).toBe('Description');
    expect(headerRow.cells[2].innerHTML.trim()).toBe('Price');
    expect(headerRow.cells[3].innerHTML.trim()).toBe('Stock');
    expect(headerRow.cells[4].innerHTML.trim()).toBe('Add to cart');

    // Data rows
    let row1 = tableRows[1];
    expect(row1.cells[0].innerHTML.trim()).toBe(mockProduct.name);
    expect(row1.cells[1].innerHTML.trim()).toBe(mockProduct.description);
    expect(row1.cells[2].innerHTML.trim()).toBe(mockProduct.price.toString());
    expect(row1.cells[3].innerHTML.trim()).toBe(mockProduct.stock.toString());
  }));

  it('should add new product to cart', fakeAsync(async ()=> {
    mockMatDialog.open =
      jasmine.createSpy().and.returnValue({
        afterClosed: ()=> of({number: 1})
      },
    );
    const spytakeProducts = spyOn(component, 'takeLocalProduct');
    fixture.detectChanges();
    tick(1000);
    fixture.detectChanges();
    let buttonCartdebug = fixture.debugElement.query(By.css('button[aria-label="Edit product"] '));
    let buttonCart = buttonCartdebug.nativeElement;
    buttonCart.click();
    fixture.detectChanges();
    tick(1000);
    fixture.detectChanges();
    expect(spytakeProducts).toHaveBeenCalledTimes(1);
    expect(component.cart.products.length).toBe(1);
  }));

  it('should open the cart and get the purchases invoice', fakeAsync(async ()=> {
    mockMatDialog.open =
      jasmine.createSpy().and.returnValues({
        afterClosed: ()=> of(mockInvoice)
      },
      {},
    );
    const spyopenInvoiceResume = spyOn(component, 'openInvoiceResume');
    component.openCart();
    fixture.detectChanges();
    tick(1000);
    fixture.detectChanges();
    expect(spyopenInvoiceResume).toHaveBeenCalledTimes(1);
    expect(component.cart).toEqual({products : []});
  }));
});

