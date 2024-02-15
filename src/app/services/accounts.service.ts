import { Injectable } from '@angular/core';
import { constant } from '../constants/constants';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccountDetails } from '../models/account.model';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  constructor(private httpClient:HttpClient) { }

  public getAccounts(){
    return this.httpClient.get<any>(`${constant.api_url}${constant.accounts_endpoint}`);
  }

  public getAccountById(id:string, page : number , size : number):Observable<AccountDetails>
  {
    return this.httpClient.get<AccountDetails>(`${constant.api_url}${constant.accounts_endpoint}/${id}/pageOperations?page=${page}&size=${size}`);
  }

  
  public debit(accountID: string, amount : number ,description : string)
  {
    let data ={accountID: accountID, amount : amount , description : description};
    return this.httpClient.post(`${constant.api_url}${constant.accounts_endpoint}${constant.debit_endpoint}`,data);
  }

  public credit(accountID: string, amount : number ,description : string)
  {
    let data ={accountID: accountID, amount : amount , description : description};
    return this.httpClient.post(`${constant.api_url}${constant.accounts_endpoint}${constant.credit_endpoint}`,data);
  }

  public transfer(accountIdSource: string, accountIdDestination: string, amount : number ,description : string)
  {
    let data ={
      accountIdSource: accountIdSource,
      accountIdDestination :accountIdDestination ,
      amount : amount,
      description : description
    };
    return this.httpClient.post(`${constant.api_url}${constant.accounts_endpoint}${constant.transfer_endpoint}`,data);
  }
}
