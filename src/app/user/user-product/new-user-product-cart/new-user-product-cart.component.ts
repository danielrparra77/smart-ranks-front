import { Component, inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import { CommonFrontModule } from '../../../common/common.module';
import { IProductToCart } from '../../../interfaces/cart.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IDialog } from '../../../common/dialog.uc';

@Component({
  selector: 'app-new-user-product-cart',
  imports: [
    CommonFrontModule,
    MatDialogContent,
    MatDialogActions,
  ],
  templateUrl: './new-user-product-cart.component.html',
  styleUrl: './new-user-product-cart.component.css'
})
export class NewUserProductCartComponent extends IDialog {
  readonly data = inject<IProductToCart>(MAT_DIALOG_DATA);
  form: FormGroup = new FormGroup({
    number: new FormControl(this.data.number, [Validators.required, Validators.max(this.data.product.stock)]),
  });

  constructor(){
    const dialogRef = inject(MatDialogRef<NewUserProductCartComponent>);
    super(dialogRef);
  }
  
  submit(): void {
    if (!this.form.valid) return;
    this.dialogRef.close(this.form.getRawValue());
  }
}
