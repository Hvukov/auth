import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit{
  month!: any;
  year!: any;
  monthName!: any;
  isCurrentYear!: boolean;

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
