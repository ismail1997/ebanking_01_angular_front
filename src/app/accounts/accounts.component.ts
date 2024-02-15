import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AccountsService } from '../services/accounts.service';
import { Observable, catchError, throwError } from 'rxjs';
import { AccountDetails } from '../models/account.model';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit, OnDestroy{

 

  public accountFormGroup! : FormGroup;
  public currentPage : number = 0;
  public pageSize : number =5;
  public accountObservable!:Observable<AccountDetails>;
  public operationFormGroup!:FormGroup;

  public errorMessage!:string;

  constructor(private fb: FormBuilder, private service : AccountsService, public authService : AuthenticationService){}

  ngOnInit(): void {
    this.accountFormGroup=this.fb.group({
      accountId: this.fb.control('')
    });

    this.operationFormGroup=this.fb.group({
      operationType: this.fb.control(null),
      amount: this.fb.control(0),
      description: this.fb.control(null),
      accountDestination: this.fb.control(null)

    });
    
  }
  ngOnDestroy(): void {
    
  }


  handleSearchAccount(){
    let id : string = this.accountFormGroup.value.accountId;
    this.accountObservable = this.service.getAccountById(id,this.currentPage,this.pageSize).pipe(
      catchError((err)=>{
        this.errorMessage=err.message;
        return throwError(err);
      })
    );

  }

  goToPage(page: number) {
    console.log(page);
    this.currentPage=page;
    this.handleSearchAccount();
  }


  handleAccountOperation() {
    let accountSourceID : string = this.accountFormGroup.value.accountId;
    let operationType = this.operationFormGroup.value.operationType;
    let amount :number = this.operationFormGroup.value.amount;
    let description: string = this.operationFormGroup.value.description;
    let accountDestination : string = this.operationFormGroup.value.accountDestination;

    if(operationType=='CREDIT'){
      this.service.credit(accountSourceID,amount,description).subscribe({
        next: data=>{
          alert("Success Credit Operation");
          this.operationFormGroup.reset();
          this.handleSearchAccount();
        },
        error: err=>{
          console.log(err);
        }
      });
    }else if(operationType=='DEBIT'){
      this.service.debit(accountSourceID,amount,description).subscribe({
        next: data=>{
          alert("Success Debit Operation");
          this.operationFormGroup.reset();
          this.handleSearchAccount();
        },
        error: err=>{
          console.log(err);
        }
      });
    }else if(operationType=='TRANSFER'){
      this.service.transfer(accountSourceID,accountDestination,amount,description).subscribe({
        next: data=>{
          alert("Success Debit Operation");
          this.operationFormGroup.reset();
          this.handleSearchAccount();
        },
        error: err=>{
          console.log(err);
        }
      });
    }
    
  }
    

}
