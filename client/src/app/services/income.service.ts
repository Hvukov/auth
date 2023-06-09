import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IncomeService {

  constructor(private http:HttpClient) { }

  getCategories() {
    return this.http.get('http://localhost:3000/api/incomeCategories');
  }
}
