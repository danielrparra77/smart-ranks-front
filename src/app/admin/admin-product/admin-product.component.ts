import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CommonFrontModule } from '../../common/common.module';
import { ProductService } from '../../service/product/product.service';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { IProduct } from '../../interfaces/product.entity';
import { AdminNewProductComponent } from './admin-new-product/admin-new-product.component';

@Component({
  selector: 'app-admin-product',
  imports: [CommonFrontModule],
  templateUrl: './admin-product.component.html',
  styleUrl: './admin-product.component.css'
})
export class AdminProductComponent implements OnInit  {
  constructor(
    private readonly productService: ProductService,
    private changeDetectorRefs: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.getProducts();
  } 

  readonly dialog = inject(MatDialog);
  products: MatTableDataSource<IProduct> = new MatTableDataSource<IProduct>([]);
  displayedColumns: string[] = ['name', 'description', 'price', 'stock', 'status' ,'edit'];

  getProducts() {
    this.productService.getProducts()
      .subscribe((products: IProduct[]) => {
        this.products.data = products;
        this.products.data = this.products.data;
        this.changeDetectorRefs.detectChanges();
    });
  }

  createProduct(): void {
    const dialogRef = this.dialog.open(AdminNewProductComponent, {
      data: {new: true},
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.getProducts();
      }
    });
  }

  editProduct(product: IProduct): void {
    const dialogRef = this.dialog.open(AdminNewProductComponent, {
      data: {...product, new: false},
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.getProducts();
      }
    });
  }

}
