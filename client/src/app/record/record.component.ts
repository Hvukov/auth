import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RecordsService } from '../services/records.service';

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.css']
})
export class RecordComponent implements OnInit{
  categories! :any;

  showDropdown = false;

  constructor(
    private fb: FormBuilder,
    private recordService: RecordsService) { }

    recordForm = this.fb.group({
      user: [''],
      category: [''],
      subcategory: [''],
      amount: [''],
      date: [''],
    })

    ngOnInit(): void {
      this.recordService.getCategories()
      .subscribe((response: any) => {
        this.categories = response.data;
        this.categories = response.data.map((category: any) => ({
          ...category,
          showDropdown: false
        }));


      }, err => {
        console.log(err);
      })
    }

    onSubmit() {
      console.log(this.recordForm.getRawValue());

    }

    toggleDropdown(category:any) {
      category.showDropdown = !category.showDropdown;

    }
  }

