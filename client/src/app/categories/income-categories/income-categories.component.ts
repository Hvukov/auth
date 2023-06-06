
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { IncomeCategoriesService } from 'src/app/services/income-categories.service';
import { IIncomeCategory } from 'src/app/shared-types/categories';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-income-categories',
  templateUrl: './income-categories.component.html',
  styleUrls: ['./income-categories.component.css']
})

export class IncomeCategoriesComponent implements OnInit{
  categories: IIncomeCategory[] = [];
  selectedIncomeCategory!: any;
  selectedCategory!:any;
  isResponseOk!:boolean;
  @ViewChild('dialog') dialog!:ElementRef;
  @ViewChild('closeButton') closeButton!:ElementRef;

  constructor(
    private incomeCategoriesService:IncomeCategoriesService,
    private fb: FormBuilder,
    private toastr: ToastrService
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
     this.selectedIncomeCategory.name = response.data.name;
     this.isResponseOk = true;
     //close modal button
      this.closeButton.nativeElement.click();
      this.toastr.success(`${this.selectedIncomeCategory.name} kategorija je preimenovana u ${response.data.name}`, 'Uspješna promjena imena kategorije!');
      this.incomeCategoriesForm.reset();
    },
    err => {
      this.isResponseOk = false;
    })
  }

  addIncomeCategory() {
    this.incomeCategoriesService.addIncomeCategory(this.newCategoryForm.getRawValue())
    .subscribe((response:any) => {
      this.categories.push(response.data);
      this.isResponseOk = true;
      this.toastr.success(`${response.data.name} kategorija je dodata`, 'Uspješno dodavanje kategorije!');
    },
    err => {
      this.isResponseOk = false;
      this.toastr.error(`Kategorija nije dodata`, 'Greška!');
    })


  }

  deleteIncomeCategory() {
    this.incomeCategoriesService.deleteIncomeCategory(this.selectedIncomeCategory._id)
    .subscribe((response:any) => {
      this.categories = this.categories.filter((category)=> {
        return category._id !== this.selectedIncomeCategory._id;
      })
      this.toastr.success(`${this.selectedIncomeCategory.name} kategorija je izbrisana`, 'Uspješno brisanje kategorije!');
    },
    (err:any) => {
      this.toastr.error(`Kategorija nije izbrisana`, 'Greška!');
    })
  }

  openDialog(category:any) {
    this.selectedCategory = category;
    this.dialog.nativeElement.showModal();
    console.log(this.selectedCategory);

  }
}
