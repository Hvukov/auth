import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CategoriesComponent } from './categories/categories.component';
import { ExpensesComponent } from './expenses/expenses.component';

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:"categories", component:CategoriesComponent},
  {path:"expenses", component: ExpensesComponent},
  {path:"login", component:LoginComponent},
  {path:"register", component:RegisterComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
