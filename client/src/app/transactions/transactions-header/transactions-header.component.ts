
import { Component, Input, OnInit } from '@angular/core';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-transactions-header',
  templateUrl: './transactions-header.component.html',
  styleUrls: ['./transactions-header.component.css']
})
export class TransactionsHeaderComponent implements OnInit {
  @Input() month!: any;
  @Input() year!: any;
  @Input() monthName!: any;
  @Input() isCurrentYear!: boolean;

  months:string[] = ["Siječanj", "Veljača", "Ožujak", "Travanj", "Svibanj", "Lipanj", "Srpanj", "Kolovoz", "Rujan", "Listopad", "Studeni", "Prosinac"];

  faArrowLeft = faArrowLeft;
  faArrowRight = faArrowRight;

  ngOnInit(): void {
    const currentDate = new Date();
    const monthNumber = currentDate.getMonth();
    this.monthName = this.months[monthNumber];
    this.month = currentDate.getMonth() + 1;


    this.year = currentDate.getFullYear();

    const currentYear = new Date().getFullYear();
    this.isCurrentYear = (this.year === currentYear);

    console.log(this.isCurrentYear);


  }

  nextMonth() {
    this.month++;
    if (this.month > 12) {
      this.month = 1;

      this.year++;
    }
    this.monthName = this.months[this.month - 1];

  }

  previousMonth() {
    this.month--;
    if (this.month < 1) {
      this.month = 12;

      this.year--;
    }
    this.monthName = this.months[this.month - 1];
  }
}
