import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Emitters } from '../emitters/emitters';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  message =" You are not logged in"

  constructor(
    private http: HttpClient,
  ) { }

  ngOnInit(): void {
    this.http.get('http://localhost:3000/api/user', {withCredentials: true})
    .subscribe((response: any) => {
      this.message = `Hi ${response.name}, you are logged in!`
      Emitters.authEmitter.emit(true);
    },
    err => {
      this.message = "You are not logged in"
      Emitters.authEmitter.emit(false);
    })
  }
}
