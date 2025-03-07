import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { AdminProductComponent } from './admin-product.component';
import { ProductService } from '../../service/product/product.service';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { mockProduct } from '../../../../test/mocks/product.mock';
import { By } from '@angular/platform-browser';

describe('AdminProductComponent', () => {
  let component: AdminProductComponent;
  let fixture: ComponentFixture<AdminProductComponent>;
  let mockProductService: ProductService;
  let mockMatDialog: MatDialog;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminProductComponent],
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

    fixture = TestBed.createComponent(AdminProductComponent);
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
    expect(headerRow.cells[4].innerHTML.trim()).toBe('Status');
    expect(headerRow.cells[5].innerHTML.trim()).toBe('Edit');

    // Data rows
    let row1 = tableRows[1];
    expect(row1.cells[0].innerHTML.trim()).toBe(mockProduct.name);
    expect(row1.cells[1].innerHTML.trim()).toBe(mockProduct.description);
    expect(row1.cells[2].innerHTML.trim()).toBe(mockProduct.price.toString());
    expect(row1.cells[3].innerHTML.trim()).toBe(mockProduct.stock.toString());
    expect(row1.cells[4].innerHTML.trim()).toBe(mockProduct.status.toString());
  }));

  it('should edit product', fakeAsync(async ()=> {
    mockMatDialog.open =
      jasmine.createSpy().and.returnValue({
        afterClosed: ()=> of(mockProduct)
      },
    );
    const spytakeProducts = spyOn(component, 'getProducts');
    fixture.detectChanges();
    tick(1000);
    fixture.detectChanges();
    let buttondebug = fixture.debugElement.query(By.css('button[aria-label="Edit product"] '));
    let button = buttondebug.nativeElement;
    button.click();
    fixture.detectChanges();
    tick(1000);
    fixture.detectChanges();
    expect(spytakeProducts).toHaveBeenCalledTimes(1);
  }));

  it('should create new product', fakeAsync(async ()=> {
    mockMatDialog.open =
      jasmine.createSpy().and.returnValue({
        afterClosed: ()=> of(mockProduct)
      },
    );
    const spytakeProducts = spyOn(component, 'getProducts');
    fixture.detectChanges();
    tick(1000);
    fixture.detectChanges();
    let buttondebug = fixture.debugElement.query(By.css('button[aria-label="create product"] '));
    let button = buttondebug.nativeElement;
    button.click();
    fixture.detectChanges();
    tick(1000);
    fixture.detectChanges();
    expect(spytakeProducts).toHaveBeenCalledTimes(1);;
  }));
});
