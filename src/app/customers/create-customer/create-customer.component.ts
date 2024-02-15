import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Customer } from 'src/app/models/customer.model';
import { CustomersService } from 'src/app/services/customers.service';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.css']
})
export class CreateCustomerComponent implements OnInit, OnDestroy{

  public createCustomerFormGroup! :FormGroup;

  constructor(private fb: FormBuilder,private service : CustomersService,private router:Router){

  }

  ngOnInit(): void {
     this.createCustomerFormGroup=this.fb.group({
      name: this.fb.control(null, [Validators.required,Validators.minLength(4)]),
      email: this.fb.control(null,[Validators.required,Validators.email]),
     });
  }
  ngOnDestroy(): void {
     
  }

  handleCreateCustomer(){
    let customer:Customer = this.createCustomerFormGroup.value;
    this.service.createCustomer(customer).subscribe({
      next: data=>{
        alert("Customer has been successfully saved!");
        //this.createCustomerFormGroup.reset();
        this.router.navigateByUrl("/admin/customers");
      },
      error:err=>{
        console.log(err);
      }
    })
  }

}
