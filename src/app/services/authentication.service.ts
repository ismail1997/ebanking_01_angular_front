import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { constant } from '../constants/constants';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  


  public isAuthenticated : boolean = false;
  roles : any;
  username !: any ;
  accessToken !:any ;
  constructor(private httpClient:HttpClient,private router :Router) { }



  public login (username : string , password :string ){

    let options = {
      headers : new HttpHeaders().set("Content-Type","application/x-www-form-urlencoded")
    }
    let params = new HttpParams().set("username",username).set("password",password);

    return this.httpClient.post(`${constant.api_url}${constant.login_endpoint}`,params,options);
  }

  loadProfile(data : any){
    this.isAuthenticated=true;
    this.accessToken= data['access-token'];
    let decodedJwt:any = jwtDecode(this.accessToken);

    this.username=decodedJwt.sub;
    this.roles=decodedJwt.scope;

    window.localStorage.setItem("jwt-token",this.accessToken);

  }



  loadJwtFromLocalStorage() {
    let token = window.localStorage.getItem("jwt-token");
    if(token){
      this.loadProfile({"access-token":token});
      this.router.navigateByUrl("/admin/customers")
    }else{
      this.router.navigateByUrl("/login")
    }
  }

  logout() {
    this.isAuthenticated=false;
    this.accessToken=undefined;
    this.roles = undefined;
    this.username = undefined;
    window.localStorage.removeItem("jwt-token");
    this.router.navigateByUrl("/login");
  }
}
