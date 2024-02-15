import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit,OnDestroy{
  public formLogin!:FormGroup;

  constructor(private fb : FormBuilder, private service : AuthenticationService, private router : Router){}
  
  ngOnInit(): void {  
    this.formLogin = this.fb.group({
      username : this.fb.control(""),
      password : this.fb.control("")
    });
  }
  ngOnDestroy(): void {
  }    


  handleLogin(){
    let username = this.formLogin.value.username;
    let password = this.formLogin.value.password;

    this.service.login(username,password).subscribe({
      next: data=>{
        this.service.loadProfile(data);
        this.router.navigateByUrl("/admin");
      },
      error:err=>{
        console.log(err);
      }
    });
  }


}
