
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
      name: ['', Validators.required],
      _id: ['']
    })

  ngOnInit(): void {
    this.incomeCategoriesService.getIncomeCategories()
    .subscribe((response:any) => {
      this.categories = response.data;
      console.log(this.categories,"ovo su kategorije");

    })
  }

  onSelect(category:any) {
    console.log(category);
    this.selectedIncomeCategory = category;
  }

  editIncomeCategory() {
    this.incomeCategoriesService.editIncomeCategory(this.selectedIncomeCategory._id, this.incomeCategoriesForm.getRawValue())
  }

  addIncomeCategory() {
    this.incomeCategoriesService.addIncomeCategory(this.newCategoryForm.getRawValue())
    .subscribe((response:any) => {
    })
  }
}
