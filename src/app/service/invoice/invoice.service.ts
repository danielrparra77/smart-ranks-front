import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { IService } from '../service';
import { catchError, Observable, tap } from 'rxjs';
import { IInvoice } from '../../interfaces/invoice.interface';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService extends IService {

  backService = environment.backService;

  constructor(private http: HttpClient) {
    super();
  }
  
  getInvoices(): Observable<string[]> {
    return this.http.get<string[]>(this.backService+ 'invoice/ids').pipe(
      tap(_ => this.log(`invoices found`)),
      catchError(this.handleError<string[]>(`invoices`))
    );
  }
  
  getInvoiceByID(id: string): Observable<IInvoice> {
    return this.http.get<IInvoice>(this.backService+ 'invoice', {params: {id}}).pipe(
      tap(_ => this.log(`invoice found`)),
      catchError(this.handleError<IInvoice>(`invoice`))
    );
  }
}
