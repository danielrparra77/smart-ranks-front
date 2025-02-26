import { Injectable } from '@angular/core';
import { catchError, Observable, tap } from 'rxjs';
import { IProduct } from '../../interfaces/product.entity';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { IService } from '../service';
import { ICart } from '../../interfaces/cart.interface';
import { IInvoice } from '../../interfaces/invoice.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends IService {

  backService = environment.backService;

  constructor(private http: HttpClient) {
    super();
  }
  
  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.backService+ 'product').pipe(
      tap(_ => this.log(`products found`)),
      catchError(this.handleError<IProduct[]>(`products`))
    );
  }
  
  findByIds(_id:string[]): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.backService+ 'product/ids', {params: {_id}}).pipe(
      tap(_ => this.log(`products by id found`)),
      catchError(this.handleError<IProduct[]>(`products by id`))
    );
  }
  
  upsertProduct(product: IProduct): Observable<IProduct> {
    return this.http.post<IProduct>(this.backService+ 'product', product).pipe(
      tap(_ => this.log(`product updated`)),
      catchError(this.handleError<IProduct>(`product`))
    );
  }
  
  purchaseProduct(cart: ICart): Observable<IInvoice> {
    const rawBody:any = {products :[]};
    for (const i in cart.products){
      const product = cart.products[i];
      rawBody.products.push({number: product.number, id: product.product.id});
    }
    return this.http.put<IInvoice>(this.backService+ 'product', rawBody).pipe(
      tap(_ => this.log(`purchase updated`)),
      catchError(this.handleError<IInvoice>(`purchase`))
    );
  }
}
