import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { constant } from '../constants/constants';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {




  constructor(private httpClient: HttpClient) { }


  public getCustomers():Observable<Array<Customer>>{
    return this.httpClient.get<Array<Customer>>(`${constant.api_url}${constant.customers_endpoint}`);
  }


  public searchCustomers(keyword:string):Observable<Array<Customer>>{
    return this.httpClient.get<Array<Customer>>(`${constant.api_url}${constant.customers_endpoint}/search?keyword=${keyword}`);
  }

  public createCustomer(customer:Customer):Observable<Customer>{
    return this.httpClient.post<Customer>(`${constant.api_url}${constant.customers_endpoint}`,customer);
  }

  public deleteCustomer(customerID:number){
    return this.httpClient.delete(`${constant.api_url}${constant.customers_endpoint}/${customerID}`);
  }

  public getCustomerAccounts(customerID:number){
    return this.httpClient.get<any>(`${constant.api_url}${constant.customers_endpoint}/${customerID}/accounts`);
  }

 



}
