import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ExpenseCategoriesService } from 'src/app/services/expense-categories.service';
import { IExpenseCategory, ISubcategory } from 'src/app/shared-types/categories';

@Component({
  selector: 'app-expense-categories',
  templateUrl: './expense-categories.component.html',
  styleUrls: ['./expense-categories.component.css']
})
export class ExpenseCategoriesComponent implements OnInit{
    expenseCategories:IExpenseCategory[] = [];
    selectedCategory!:any;
    selectedCategoriesIndex!:number;
    selectedSubcategory!:any;
    subcategories: ISubcategory[] = [];

    constructor(
      private expenseCategoryService: ExpenseCategoriesService,
      private fb: FormBuilder,
      private expenseCategoriesService: ExpenseCategoriesService
      ) { }

    expenseCategoryForm = this.fb.group({
      name: [''],
      subcategoryName: ['']
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
      this.selectedCategoriesIndex = this.expenseCategories.indexOf(category);
      this.subcategories = this.expenseCategories[this.selectedCategoriesIndex].subcategories;
      console.log(this.subcategories);
    }

    editExpenseCategory() {
      console.log(this.expenseCategoryForm.getRawValue());

    }

    editExpenseCategoryName() {
      return this.expenseCategoriesService.editExpenseCategory(this.selectedCategory._id, this.expenseCategoryForm.getRawValue())
      .subscribe((response:any) => {
        this.expenseCategories = this.expenseCategories.map(category => {
          if(category._id === this.selectedCategory._id) {
            return response.data;
          }
          return category;
        })
      }
      )
    }

    onSubCategorySelect(subcategory:ISubcategory) {
      this.selectedSubcategory = subcategory;
      this.fb.group({
        subcategoryName: [this.selectedSubcategory.name]
      })
    }

    editExpenseSubcategoryName() {
      const newName = this.expenseCategoryForm.getRawValue().subcategoryName || '';

      return this.expenseCategoriesService.editExpenseSubcategory(this.selectedCategory._id, this.selectedSubcategory._id, newName)
      .subscribe((response:any) => {
        this.subcategories = this.subcategories.map((subcategory: ISubcategory) => {
          if (subcategory._id === this.selectedSubcategory._id) {
            subcategory.name = newName;
          }
          return subcategory;
        })
      },err => {
        console.log(err);
      })

    }
    deleteExpenseCategory() {
      return this.expenseCategoriesService.deleteExpenseCategory(this.selectedCategory._id)
      .subscribe((response:any) => {
        this.expenseCategories.splice(this.selectedCategoriesIndex, 1);
      })
    }

}
