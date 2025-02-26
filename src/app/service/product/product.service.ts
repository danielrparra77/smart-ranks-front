import { Injectable } from '@angular/core';
import { catchError, Observable, tap } from 'rxjs';
import { IProduct } from '../../interfaces/product.entity';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { IService } from '../service';

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
  
  upsertProduct(product: IProduct): Observable<IProduct> {
    return this.http.post<IProduct>(this.backService+ 'product', product).pipe(
      tap(_ => this.log(`product updated`)),
      catchError(this.handleError<IProduct>(`product`))
    );
  }
}
