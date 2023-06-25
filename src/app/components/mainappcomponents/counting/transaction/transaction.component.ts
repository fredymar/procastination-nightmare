import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent {
  @Input() transactionShow!: Boolean;
  @Input() type!: String;


  transactionShowFunction() {
    this.transactionShow = !this.transactionShow
  }

  createTransaction(form: NgForm) {
    let data = form.value
    console.log(data)
  }
}
