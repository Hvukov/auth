import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Emitters } from '../emitters/emitters';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  message = "You are not logged in";

  form!: FormGroup;

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder
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

    this.getCategories();
  }

  getCategories() {
    this.http.get("http://localgost:3000/api/categories")
    .subscribe((response: any) => {
      console.log(response);

    }, err => {
      console.log(err);
    })
  }

  addRecord() {
    this.http.post('http://localhost:3000/api/records', this.form.getRawValue())
    .subscribe((response: any) => {
      console.log(response)
    })
    console.log(this.form.getRawValue());

  }
}
