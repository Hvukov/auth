import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Emitters } from '../emitters/emitters';
import categories from '../../records-categories-storage/categories.json';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  message =" You are not logged in"
  rezije:string[] = [];
  form!: FormGroup;

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.rezije = this.getCategories()
    this.form = this.formBuilder.group({
      date: Date.now(),
      category: 'Režije',
      subcategory: 'Struja',
      amount: '',
      user: 'Hrvoje'
    })

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

  getCategories() {
    return categories.Režije;
  }

  addRecord() {
    this.http.post('http://localhost:3000/api/records', this.form.getRawValue())
    .subscribe((response: any) => {
      console.log(response)
    })
    console.log(this.form.getRawValue());

  }
}
