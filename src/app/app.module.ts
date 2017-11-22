import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from "@angular/http";
import { FormsModule } from "@angular/forms";

import { AppComponent } from './app.component';

import { CustomerService } from "./service/customer.service";
import { ShoeService } from "./service/shoe.service";
import { BillService } from "./service/bill.service";

import { ReactiveFormsModule } from "@angular/forms";

import { CustomerComponent } from "./customer/customer.component";
import { ShoeComponent } from "./shoe/shoe.component";
import { BillComponent } from "./bill/bill.component";


import { Routes, RouterModule } from "@angular/router";
import { Ng2PaginationModule } from "ng2-pagination";
import { HomeComponent } from './home/home.component';

const appRoutes: Routes = [
  {path: "shoe", component: ShoeComponent },
  {path: "customer", component: CustomerComponent },
  {path: "bill", component: BillComponent },
  {path: "home", component: HomeComponent },
  { path: '', redirectTo: '/', pathMatch: 'full' }
  
]
@NgModule({
  declarations: [
    AppComponent,
    ShoeComponent,
    CustomerComponent,
    BillComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    Ng2PaginationModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    CustomerService, ShoeService, BillService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
