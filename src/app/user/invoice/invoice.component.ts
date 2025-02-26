import { Component, inject } from '@angular/core';
import { CommonFrontModule } from '../../common/common.module';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import { IInvoice, IInvoiceView } from '../../interfaces/invoice.interface';
import { IDialog } from '../../common/dialog.uc';
import { InvoiceService } from '../../service/invoice/invoice.service';
import { IUser } from '../../interfaces/user.interface';
import { IProduct } from '../../interfaces/product.entity';
import { ProductService } from '../../service/product/product.service';
import { UserService } from '../../service/user/user.service';

@Component({
  selector: 'app-invoice',
  imports: [
    CommonFrontModule,
    MatDialogContent,
    MatDialogActions,
  ],
  templateUrl: './invoice.component.html',
  styleUrl: './invoice.component.css'
})
export class InvoiceComponent extends IDialog {
  readonly data:IInvoiceView = inject<IInvoiceView>(MAT_DIALOG_DATA);
  invoice: IInvoice | undefined;
  userInvoice: IUser | undefined;
  productsInvoice: IProduct[] | undefined;
  error:string = '';

  constructor (
    private readonly invoiceService: InvoiceService,
    private readonly productService: ProductService,
    private readonly userService: UserService,
  ) {
    const dialogRef = inject(MatDialogRef<InvoiceComponent>);
    super(dialogRef);
    this.getInvoiceData();
  }

  getInvoiceData() {
    if (this.data.invoiceData) {
      this.invoice = this.data.invoiceData;
      return this.getComplementInvoiceData();
    }
    this.invoiceService.getInvoiceByID(this.data.id as string)
      .subscribe((invoice: IInvoice) => {
        if (!invoice){
          this.error = 'error getting invoice';
          return;
        }
        this.invoice = invoice;
        return this.getComplementInvoiceData();
      });
  }

  private getComplementInvoiceData(){
    this.getUserData();
    this.getProductsData();
  }

  private getUserData() {
    this.userService.getUserbyId(this.invoice?.user_id as string)
      .subscribe((user: IUser) => {
        if (!user){
          this.error = 'error getting invoice user';
          return;
        }
        this.userInvoice = user;
      });
  }

  private getProductsData() {
    this.productService.findByIds(this.invoice?.products as string[])
      .subscribe((products: IProduct[]) => {
        if (!products){
          this.error = 'error getting invoice products';
          return;
        }
        this.productsInvoice = products;
      });
  }


}
