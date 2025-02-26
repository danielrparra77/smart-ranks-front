import { Component, inject } from '@angular/core';
import { CommonFrontModule } from '../../../common/common.module';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import { IProduct, IProductUpsert } from '../../../interfaces/product.entity';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../../service/product/product.service';
import { StatusEnum } from '../../../enum/status.enum';

@Component({
  selector: 'app-admin-new-product',
    imports: [
      CommonFrontModule,
      MatDialogContent,
      MatDialogActions,
    ],
  templateUrl: './admin-new-product.component.html',
  styleUrl: './admin-new-product.component.css'
})
export class AdminNewProductComponent {
  statusActive = StatusEnum.active;
  statusInactive = StatusEnum.inactive;
  readonly dialogRef = inject(MatDialogRef<AdminNewProductComponent>);
  readonly data = inject<IProductUpsert>(MAT_DIALOG_DATA);
  form: FormGroup = new FormGroup({
    name: new FormControl(this.data.name, [Validators.required]),
    description: new FormControl(this.data.description, [Validators.required]),
    price: new FormControl(this.data.price, [Validators.required]),
    stock: new FormControl(this.data.stock, [Validators.required]),
    status: new FormControl(this.data.status, [Validators.required]),
  });
  error:string = '';

  constructor (private readonly productService: ProductService,) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  submit(): void {
    if (!this.form.valid) return;
    this.productService.upsertProduct(this.form.getRawValue())
      .subscribe((user: IProduct) => {
        if (!user){
          this.error = 'error updating product';
          return;
        }
        this.dialogRef.close(user);
      });
  }
}
