import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IExpenseCategory } from '../shared-types/categories';

@Injectable({
  providedIn: 'root'
})
export class ExpenseCategoriesService {

  constructor(private http:HttpClient) { }

  getExpenseCategories():Observable<IExpenseCategory> {
    return this.http.get<IExpenseCategory>('http://localhost:3000/api/categories');
  }
}
