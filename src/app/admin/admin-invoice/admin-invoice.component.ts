import { Component, inject } from '@angular/core';
import { InvoiceService } from '../../service/invoice/invoice.service';
import { CommonFrontModule } from '../../common/common.module';
import { MatDialog } from '@angular/material/dialog';
import { InvoiceComponent } from '../../user/invoice/invoice.component';

@Component({
  selector: 'app-admin-invoice',
  imports: [ CommonFrontModule ],
  templateUrl: './admin-invoice.component.html',
  styleUrl: './admin-invoice.component.css'
})
export class AdminInvoiceComponent {
  invoices: string[] = [];
  readonly dialog = inject(MatDialog);

  constructor(
    private readonly invoiceService: InvoiceService,
  ) {
    this.getInvoices();
  }

  getInvoices(): void {
    this.invoiceService.getInvoices()
    .subscribe((invoices: string[]) => {
      this.invoices = invoices;
    });
  }

  openInvoiceDetail(id: string) {
    this.dialog.open(InvoiceComponent, {
      data: {id},
    });
  }
}
