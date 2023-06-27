import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BankService } from 'src/app/api/bank/bank.service';
import { Bank } from 'src/app/models/bank.models';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent {
  @Input() transactionShow!: Boolean;
  @Input() type!: String;
  @Input() bank!: String;
  @Output() changeShow: EventEmitter<Boolean> = new EventEmitter<Boolean>();

  //Raise the event to send the data back to parent
  updateShowTransaction() {
    this.changeShow.emit(this.transactionShow);
  }

  transactionShowFunction() {
    this.transactionShow = !this.transactionShow
  }
  constructor(public bankService: BankService) {}
  ngOnInit(): void {
    if (this.type == 'income'){
      this.bankService.transactionToCreate.type = 'income'
    }
    if (this.type == 'expense'){
      this.bankService.transactionToCreate.type = 'expense'
    }
  }
  
  cleanForm() {
    this.bankService.bankToCreate = new Bank();
  }

  createTransaction(form: NgForm) {
    // revisar los campos
    let data = form.value
    data.bank = this.bank 
    this.bankService.createTransaction(data).subscribe((data: any) => {
      this.updateShowTransaction()
      console.log({ data });
    });
  }
}