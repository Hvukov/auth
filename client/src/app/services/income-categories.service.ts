import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IncomeCategoriesService {

  constructor(private http:HttpClient) { }

  getIncomeCategories():Observable<any> {
    return this.http.get('http://localhost:3000/api/incomeCategories');
  }

  editIncomeCategory(id:any, name:any):Observable<any> {
    return this.http.patch(`http://localhost:3000/api/incomeCategories/${id}`, name);
  }

  addIncomeCategory(name:any):Observable<any> {
    return this.http.post('http://localhost:3000/api/incomeCategories', name);
  }

  deleteIncomeCategory(id:any):Observable<any> {
    return this.http.delete(`http://localhost:3000/api/incomeCategories/${id}`);
  }
}
