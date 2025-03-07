import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CommonFrontModule } from '../../common/common.module';
import { ProductService } from '../../service/product/product.service';
import { MatTableDataSource } from '@angular/material/table';
import { IProduct } from '../../interfaces/product.entity';
import { ICart, IProductToCart } from '../../interfaces/cart.interface';
import { MatDialog } from '@angular/material/dialog';
import { NewUserProductCartComponent } from './new-user-product-cart/new-user-product-cart.component';
import { UserCartComponent } from './user-cart/user-cart.component';
import { IInvoice } from '../../interfaces/invoice.interface';
import { InvoiceComponent } from '../invoice/invoice.component';

@Component({
  selector: 'app-user-product',
  imports: [CommonFrontModule],
  templateUrl: './user-product.component.html',
  styleUrl: './user-product.component.css'
})
export class UserProductComponent implements OnInit {
  constructor(
    private readonly productService: ProductService,
    private changeDetectorRefs: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.getProducts();
  } 

  readonly dialog = inject(MatDialog);
  cart: ICart = {products : []};
  products: MatTableDataSource<IProduct> = new MatTableDataSource<IProduct>([]);
  displayedColumns: string[] = ['name', 'description', 'price', 'stock' ,'cart'];
  
  getProducts() {
    this.productService.getProducts()
      .subscribe((products: IProduct[]) => {
        this.products.data = products;
        this.refreshProductTable();
    });
  }

  refreshProductTable(){
    this.products.data = this.products.data;
    this.changeDetectorRefs.detectChanges();
  }

  takeLocalProduct(product: IProductToCart){
    const products:IProduct[] = this.products.data;
    products.filter(p => p.id == product.product.id)[0].stock -= product.number;
    this.refreshProductTable();
  }

  addToCart(product: IProduct) {
    const dialogRef = this.dialog.open(NewUserProductCartComponent, {
      data: {number: 0, product},
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        const newCartProrduct:IProductToCart = {
          number: result.number,
          product,
        }
        this.cart.products.push(newCartProrduct);
        this.takeLocalProduct(newCartProrduct);
      }
    });
  }

  openCart() {
    const dialogRef = this.dialog.open(UserCartComponent, {
      data: this.cart,
    });
    dialogRef.afterClosed().subscribe(invoice => {
      if (invoice !== undefined) {
        this.cart = {products : []};
        this.getProducts();
        this.openInvoiceResume(invoice);
      }
    });
  }

  openInvoiceResume(invoice:IInvoice) {
      this.dialog.open(InvoiceComponent, {
        data: {invoiceData: invoice},
      });
  }
}
