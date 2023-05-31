
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { IncomeCategoriesService } from 'src/app/services/income-categories.service';
import { IIncomeCategory } from 'src/app/shared-types/categories';

@Component({
  selector: 'app-income-categories',
  templateUrl: './income-categories.component.html',
  styleUrls: ['./income-categories.component.css']
})

export class IncomeCategoriesComponent implements OnInit{
  categories: IIncomeCategory[] = [];
  selectedIncomeCategory!: any;

  constructor(
    private incomeCategoriesService:IncomeCategoriesService,
    private fb: FormBuilder,
    ) { }

    incomeCategoriesForm = this.fb.group( {
      name: ['', Validators.required]
    })

    newCategoryForm = this.fb.group({
      name: ['', Validators.required]
    })

  ngOnInit(): void {
    this.incomeCategoriesService.getIncomeCategories()
    .subscribe((response:any) => {
      this.categories = response.data;
    })
  }

  onSelect(category:any) {
    console.log(category);
    this.selectedIncomeCategory = category;
  }

  editIncomeCategory() {
    this.incomeCategoriesService.editIncomeCategory(this.selectedIncomeCategory._id, this.incomeCategoriesForm.getRawValue())
    .subscribe((response:any) => {
      //update the categories array
     this.categories = this.categories.map((category => {
        if(category._id === this.selectedIncomeCategory._id) {
          return response.data;
        }
        return category;
     }))
    })
  }

  addIncomeCategory() {
    this.incomeCategoriesService.addIncomeCategory(this.newCategoryForm.getRawValue())
    .subscribe((response:any) => {
      this.categories.push(response.data);
    })
  }

  deleteIncomeCategory() {
    this.incomeCategoriesService.deleteIncomeCategory(this.selectedIncomeCategory._id)
    .subscribe((response:any) => {
      this.categories = this.categories.filter((category)=> {
        return category._id !== this.selectedIncomeCategory._id;
      })
    })
  }
}
