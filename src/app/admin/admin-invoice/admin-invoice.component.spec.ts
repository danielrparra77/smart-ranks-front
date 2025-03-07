import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { AdminInvoiceComponent } from './admin-invoice.component';
import { InvoiceService } from '../../service/invoice/invoice.service';
import { of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

describe('AdminInvoiceComponent', () => {
  let component: AdminInvoiceComponent;
  let fixture: ComponentFixture<AdminInvoiceComponent>;

  let mockInvoiceService: InvoiceService;
  let mockMatDialog: MatDialog;

  const mockInvoices = ['27050cd9-1cee-4b60-a109-2990dfd196ef'];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminInvoiceComponent],
      providers: [
        {
          provide: InvoiceService,
          useValue: jasmine.createSpyObj('InvoiceService', ['getInvoices']),
        },
        {
          provide: MatDialog,
          useValue: jasmine.createSpyObj('MatDialog', ['open']),
        },
      ],
    })
    .compileComponents();
    mockMatDialog = TestBed.inject<MatDialog>(
      MatDialog,
    );
    mockInvoiceService = TestBed.inject<InvoiceService>(
      InvoiceService,
    );
    mockInvoiceService.getInvoices =
      jasmine.createSpy().and.returnValue(of(mockInvoices));

    fixture = TestBed.createComponent(AdminInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should render invoicesIds', fakeAsync(async ()=> {
    fixture.detectChanges();
    tick(1000);
    fixture.detectChanges();

    expect(component.invoices.length).toBe(1);
    let chips = fixture.nativeElement.querySelectorAll('mat-chip');
    expect(chips.length).toBe(1);
    const id = mockInvoices[0];
    expect(chips[0].textContent.trim()).toBe('detail of **'+id.substr(id.length - 5));
  }));
  
  it('should open invoice detail', fakeAsync(async ()=> {
    fixture.detectChanges();
    tick(1000);
    fixture.detectChanges();

    expect(component.invoices.length).toBe(1);
    let chips = fixture.nativeElement.querySelectorAll('mat-chip');
    expect(chips.length).toBe(1);
  
    chips[0].click();
  
    fixture.detectChanges();
    tick(1000);
    fixture.detectChanges();

    expect(mockMatDialog.open).toHaveBeenCalledTimes(1);
  }));
});
