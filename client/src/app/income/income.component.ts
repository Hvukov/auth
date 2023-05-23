import { Component, OnInit } from '@angular/core';
import { IncomeService } from '../services/income.service';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.css']
})
export class IncomeComponent implements OnInit{

  categories!:any;
  selectedCategory!:any;
  user!: any;

  constructor(
    private incomeService:IncomeService,
    private fb: FormBuilder,
    private http:HttpClient
    ) { }

  incomeForm = this.fb.group({
    user: [''],
    category: [''],
    amount: ['', Validators.required],
    date: ['', Validators.required]
  })

  ngOnInit(): void
  {
    this.http.get('http://localhost:3000/api/user', {withCredentials: true})
    .subscribe((response: any) => {
      this.user = response.name;
    })

    this.incomeService.getCategories()
    .subscribe((response:any) => {
      this.categories = response.data;
    })
  }

  onSubmit() {
    this.incomeForm.patchValue({
      category: this.selectedCategory._id,
      user: this.user._id
    })
    console.log(this.incomeForm.getRawValue());
    this.http.post('http://localhost:3000/api/incomes', this.incomeForm.getRawValue())
    .subscribe((response: any) => {
      console.log(response);
    }
    )
    this.incomeForm.reset();
  }

  onSelect(category:any) {
    this.selectedCategory = category;
  }

}
