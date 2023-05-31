import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FormComponent } from './form/form.component';
import { RecordComponent } from './record/record.component';
import { IncomeComponent } from './income/income.component';
import { CategoriesComponent } from './categories/categories.component';
import { IncomeCategoriesComponent } from './categories/income-categories/income-categories.component';
import { ExpenseCategoriesComponent } from './categories/expense-categories/expense-categories.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    NavComponent,
    HomeComponent,
    FormComponent,
    RecordComponent,
    IncomeComponent,
    CategoriesComponent,
    IncomeCategoriesComponent,
    ExpenseCategoriesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
