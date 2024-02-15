import { Component, OnDestroy, OnInit } from '@angular/core';
import { CustomersService } from '../services/customers.service';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Customer } from '../models/customer.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit,OnDestroy{



  public customers!:Observable<Array<Customer>>;
  public errorMessage!:string;

  public searchFormGroup: FormGroup | undefined;

  constructor(private service:CustomersService, private fb : FormBuilder,private router:Router){

  }

  ngOnInit(): void {

    this.searchFormGroup=this.fb.group({
      keyword: this.fb.control("")
    });

    this.handleSearchCustomers();
  }
  ngOnDestroy(): void {
     
  }
  handleSearchCustomers() {
     let kw = this.searchFormGroup?.value.keyword;

    this.customers=this.service.searchCustomers(kw).pipe(
      catchError(err=>{
        this.errorMessage=err.message;
        return throwError(()=>err);
      })
    );
  }

  handleDeleteCustomer(c: Customer) {
    let conf = confirm("Are you sure?");
    if(!conf) return;
    this.service.deleteCustomer(c.id).subscribe({
      next : (resp) => {
        this.customers=this.customers.pipe(
          map(data=>{
            let index=data.indexOf(c);
            data.slice(index,1)
            return data;
          })
        );
      },
      error : err => {
        console.log(err);
      }
    })
  }

  handleCustomerAccounts(customer:Customer){
    // we get customer accounts
    this.router.navigateByUrl("/admin/customer-accounts/"+customer.id,{state :customer});
  }


}
