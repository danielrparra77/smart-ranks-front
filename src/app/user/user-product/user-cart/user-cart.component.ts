import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { CommonFrontModule } from '../../../common/common.module';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import { IDialog } from '../../../common/dialog.uc';
import { ProductService } from '../../../service/product/product.service';
import { ICart } from '../../../interfaces/cart.interface';
import { IInvoice } from '../../../interfaces/invoice.interface';

@Component({
  selector: 'app-user-cart',
  imports: [
    CommonFrontModule,
    MatDialogContent,
    MatDialogActions,
  ],
  templateUrl: './user-cart.component.html',
  styleUrl: './user-cart.component.css'
})
export class UserCartComponent extends IDialog {
  readonly data:ICart = inject<ICart>(MAT_DIALOG_DATA);
  error:string = '';
  loading:boolean = false;

  constructor (
    private readonly productService: ProductService,
    private changeDetectorRefs: ChangeDetectorRef,
  ) {
    const dialogRef = inject(MatDialogRef<UserCartComponent>);
    super(dialogRef);
  }
  
  submit(): void {
    this.loading = true;
    this.productService.purchaseProduct(this.data)
      .subscribe((invoice: IInvoice) => {
        this.loading = false;
        if (!invoice){
          this.error = 'error making purchase';
          return;
        }
        this.dialogRef.close(invoice);
      });
  }

  deleteProduct(index: number) {
    this.data.products.splice(index);
    this.changeDetectorRefs.detectChanges();
  }
}
