import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from 'src/app/models/customer.model';
import { CustomersService } from 'src/app/services/customers.service';

@Component({
  selector: 'app-customer-accounts',
  templateUrl: './customer-accounts.component.html',
  styleUrls: ['./customer-accounts.component.css']
})
export class CustomerAccountsComponent implements OnInit,OnDestroy{

  customerId! : number ;
  customer! : Customer;

  customerAccounts:any;

  constructor(private route : ActivatedRoute, private router :Router,private service:CustomersService){
    this.customer=this.router.getCurrentNavigation()?.extras.state as Customer;
  }

  ngOnInit(): void {
    this.customerId = this.route.snapshot.params['id'];
    this.getAccountsOfCustomer(this.customerId);
  }
  ngOnDestroy(): void {
    
  }



  getAccountsOfCustomer(id:number){
    this.service.getCustomerAccounts(id).subscribe({
      next: data=>{
        console.log(data);
      },
      error: error=>{
        console.log(error);
      }
    })
  }

  
}
