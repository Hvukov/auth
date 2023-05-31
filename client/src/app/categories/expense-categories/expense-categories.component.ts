import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ExpenseCategoriesService } from 'src/app/services/expense-categories.service';
import { IExpenseCategory } from 'src/app/shared-types/categories';

@Component({
  selector: 'app-expense-categories',
  templateUrl: './expense-categories.component.html',
  styleUrls: ['./expense-categories.component.css']
})
export class ExpenseCategoriesComponent implements OnInit{
    expenseCategories:IExpenseCategory[] = [];
    selectedCategory!:any;

    constructor(
      private expenseCategoryService: ExpenseCategoriesService,
      private fb: FormBuilder,
      ) { }

    expenseCategoryForm = this.fb.group({
      name: [''],
      subcategories: ['']
    })

    ngOnInit(): void {
      this.expenseCategoryService.getExpenseCategories()
      .subscribe((response:any) => {
        this.expenseCategories = response.data;
        console.log(this.expenseCategories,"ovo su kategorije");

      })
    }

    onSelect(category:any) {
      this.selectedCategory = category;
    }
}
