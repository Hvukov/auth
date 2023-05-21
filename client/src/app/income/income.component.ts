import { Component, OnInit } from '@angular/core';
import { IncomeService } from '../services/income.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.css']
})
export class IncomeComponent implements OnInit{

  categories!:any;
  selectedCategory!:any;

  constructor(
    private incomeService:IncomeService,
    private fb: FormBuilder
    ) { }

  incomeForm = this.fb.group({
    user: [''],
    category: [''],
    amount: [''],
    date: ['']
  })

  ngOnInit(): void

  {
    this.incomeService.getCategories()
    .subscribe((response:any) => {
      console.log("income categories",response.data);
      this.categories = response.data;

    })
  }

  onSubmit(category:any) {
    this.selectedCategory = category;
    console.log(this.incomeForm.getRawValue());
    console.log("šaljem kategoriju:", this.selectedCategory);
  }
}
