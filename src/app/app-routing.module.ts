import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomersComponent } from './customers/customers.component';
import { AccountsComponent } from './accounts/accounts.component';
import { AppComponent } from './app.component';
import { CreateCustomerComponent } from './customers/create-customer/create-customer.component';
import { CustomerAccountsComponent } from './customers/customer-accounts/customer-accounts.component';
import { LoginComponent } from './login/login.component';
import { AdminTemplateComponent } from './admin-template/admin-template.component';
import { authenticationGuard } from './guards/authentication.guard';
import { authorizationGuard } from './guards/authorization.guard';
import { NotAuthorizedComponent } from './not-authorized/not-authorized.component';

const routes: Routes = [
  {path:"login", component:LoginComponent},
  {path:"", redirectTo :"/login", pathMatch:"full"},
  {path:"admin", component: AdminTemplateComponent, canActivate: [authenticationGuard], children:[
    {path:"customers", component:CustomersComponent},
    {path:"accounts", component:AccountsComponent},
    {path:"create-customer", component:CreateCustomerComponent, canActivate:[authorizationGuard],data:{role:'ADMIN'}},
    {path:"customer-accounts/:id", component:CustomerAccountsComponent},
    {path:"not-authorized", component:NotAuthorizedComponent}
  ]},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
