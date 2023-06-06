import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
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
    subcategoriesList: string[] = [];

    constructor(
      private fb: FormBuilder,
      private expenseCategoriesService: ExpenseCategoriesService,
      private toastr: ToastrService
      ) { }

    expenseCategoryForm = this.fb.group({
      name: ['', Validators.required],
      subcategoryName: ['',Validators.required],
      addSubcategoryName: ['', Validators.required]
    })

    newCategoryForm = this.fb.group({
      name: ['', Validators.required],
      subcategoryName: ['', Validators.required]
    })


    get addSubcategoryName() {
      return this.expenseCategoryForm.get('addSubcategoryName');
    }

    get name() {
      return this.expenseCategoryForm.get('name');
    }

    get subcategoryName() {
      return this.expenseCategoryForm.get('subcategoryName');
    }

    get newSubcategoryName() {
      return this.newCategoryForm.get('subcategoryName');
    }

    get newName() {
      return this.newCategoryForm.get('name');
    }

    ngOnInit(): void {
      this.expenseCategoriesService.getExpenseCategories()
      .subscribe((response:any) => {
        this.expenseCategories = response.data;
      })
    }

    onSelect(category:any):void {
      this.selectedCategory = category;
      this.selectedCategoriesIndex = this.expenseCategories.indexOf(category);
      this.subcategories = this.expenseCategories[this.selectedCategoriesIndex].subcategories;
    }

    editExpenseCategoryName() {
      return this.expenseCategoriesService.editExpenseCategory(this.selectedCategory._id, this.expenseCategoryForm.getRawValue())
      .subscribe((response:any) => {
      this.selectedCategory.name = response.data.name;
      this.toastr.success(`Kategorija je preimenovana u ${response.data.name}`, 'Uspješna promjena imena kategorije!');

      },
      (err:HttpErrorResponse)=> {
        if(err.error.message === "Category already exists") {
          this.toastr.error('Kategorija već postoji!', 'Greška!');
          return;
        }
        this.toastr.error('Kategorija nije preimenovana', 'Greška!');
      }
      )
      .add(() => {
        this.expenseCategoryForm.reset();
      })
    }

    onSubCategorySelect(subcategory:ISubcategory) {
      this.selectedSubcategory = subcategory;
      this.fb.group({
        subcategoryName: [this.selectedSubcategory.name]
      },
      )
    }

    editExpenseSubcategoryName() {
      const newName = this.expenseCategoryForm.getRawValue().subcategoryName || '';

      return this.expenseCategoriesService.editExpenseSubcategory(this.selectedCategory._id, this.selectedSubcategory._id, newName)
      .subscribe((response:any) => {
        this.subcategories = this.subcategories.map((subcategory: ISubcategory) => {
          if (subcategory._id === this.selectedSubcategory._id) {
            subcategory.name = newName;
            this.toastr.success(`${this.selectedSubcategory.name} podkategorija je preimenovana u ${newName}`, 'Uspješna promjena imena podkategorije!');
          }
          return subcategory;
        })
        this.selectedSubcategory = null;
        this.expenseCategoryForm.reset();

      },err => {
        console.log(err);
      })

    }
    deleteExpenseCategory() {
      return this.expenseCategoriesService.deleteExpenseCategory(this.selectedCategory._id)
      .subscribe((response:any) => {
        this.expenseCategories.splice(this.selectedCategoriesIndex, 1);
        this.toastr.success(`${this.selectedCategory.name} kategorija je obrisana`, 'Uspješno brisanje kategorije!');
      })
    }

    deleteExpenseSubcategory() {
      return this.expenseCategoriesService.deleteExpenseSubcategory(this.selectedCategory._id, this.selectedSubcategory._id)
      .subscribe((response:any) => {
        if (response.message === "Subcategory deleted") {
          console.log(response,"ovo je response");

          this.subcategories = this.subcategories.filter((subcategory: ISubcategory) => {
            return subcategory._id !== this.selectedSubcategory._id;
          })
          this.toastr.success(`${this.selectedSubcategory.name} podkategorija je obrisana`, 'Uspješno brisanje podkategorije!');
          this.selectedSubcategory = null;
          this.expenseCategoryForm.reset();
        }


      },err => {
        this.toastr.error('Podkategorija nije obrisana', 'Greška!');
      })
    }

    addSubcategoryToList() {
      const subCategoryName = this.newCategoryForm.getRawValue().subcategoryName;

      const subcategoryExists = this.subcategoriesList.find((subcategory:string) =>{ return subcategory === subCategoryName});

      if(subcategoryExists) {
        this.toastr.error('Podkategorija već postoji!', 'Greška!');
        return;
      }


      if(subCategoryName) {
        this.subcategoriesList.push(subCategoryName);
      }

      this.newCategoryForm.patchValue({
        subcategoryName: ''
      })
    }

    createExpenseCategory() {
      const subcategories = this.subcategoriesList.map((subcategory: string) => {
        return { name: subcategory }
      })

    this.expenseCategoriesService.createExpenseCategory(this.newCategoryForm.getRawValue().name, subcategories)
    .subscribe((response:any) => {
      this.expenseCategories.push(response.data);
      this.toastr.success(`Kategorija ${this.newCategoryForm.getRawValue().name} je kreirana`, 'Uspješno kreiranje kategorije!');
    },(err:HttpErrorResponse)=>  {
      if(err.error.message === "Category already exists") {
        this.toastr.error('Kategorija već postoji!', 'Greška!');
        return;
      }
      this.toastr.error('Kategorija nije kreirana', 'Greška!');
    })
    .add(() => {
      this.subcategoriesList = [];
      this.newCategoryForm.reset();
    })

    }

    createExpenseSubcategory() {
      let addSubcategoryName = this.expenseCategoryForm.getRawValue().addSubcategoryName || ''  ;
      return this.expenseCategoriesService.createExpenseSubcategory(this.selectedCategory._id, addSubcategoryName)
      .subscribe((response:any) => {
        const newSubcategory: ISubcategory = {
          name: addSubcategoryName,
          _id: response._id
        }
        this.toastr.success(`Podkategorija ${addSubcategoryName} je kreirana`, 'Uspješno kreiranje podkategorije!');

      this.subcategories.push({name: addSubcategoryName, _id: response.id});
      },
      (err:HttpErrorResponse)=> {
        this.toastr.error('Podkategorija već postoji', 'Greška!')
      })
      .add(() => {
        this.expenseCategoryForm.reset();
        addSubcategoryName = '';
      })
    }

}
