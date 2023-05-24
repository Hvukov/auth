import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit{
  isLoggedIn:boolean = false;

  constructor (private http:HttpClient) {}

  ngOnInit(): void {
    this.http.get('http://localhost:3000/api/user', {withCredentials: true})
    .subscribe((response: any) => {
      this.isLoggedIn = true;
    },
    err => {
      this.isLoggedIn = false;
    }
    )
  }
}
