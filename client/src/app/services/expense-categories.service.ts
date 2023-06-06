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

  createExpenseCategory(name:any, subcategories:any):Observable<IExpenseCategory> {
    return this.http.post<IExpenseCategory>('http://localhost:3000/api/categories', { name, subcategories });
  }

  editExpenseCategory(id:any, name:any):Observable<any> {
    return this.http.patch(`http://localhost:3000/api/categories/${id}`, name);

  }

  editExpenseSubcategory(categoryId: any, subcategoryId: any, name: any): Observable<any> {
    return this.http.patch(`http://localhost:3000/api/categories/${categoryId}/subcategories/${subcategoryId}`, { name });
  }

  deleteExpenseCategory(id:any):Observable<any> {
    return this.http.delete(`http://localhost:3000/api/categories/${id}`);
  }

  deleteExpenseSubcategory(categoryId:any, subcategoryId:any):Observable<any> {
    return this.http.delete(`http://localhost:3000/api/categories/${categoryId}/subcategories/${subcategoryId}`);
  }

  createExpenseSubcategory(categoryId: any, name: any): Observable<any> {
    return this.http.post(`http://localhost:3000/api/categories/${categoryId}/subcategories`, { name });
  }
}
