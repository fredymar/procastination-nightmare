import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { BankService } from 'src/app/api/bank/bank.service';
import { Bank } from 'src/app/models/bank.models';

@Component({
  selector: 'app-counting',
  templateUrl: './counting.component.html',
  styleUrls: ['./counting.component.css']
})
export class CountingComponent {
  createShow = false
  transactionShow = false
  historyShow = false
  type = ''
  allBanks: Bank[] = []
  bankSelected = ''

  constructor(public bankService: BankService) { }

  ngOnInit(): void {
    this.bankService.getAllBanks().subscribe((data: any) => {
      console.log({ data });
      this.allBanks = data
    });
  }

  deleteBank(bank:any){
    this.bankService.deleteBank(bank._id).subscribe((data: any) => {
      console.log({ data });
      this.allBanks = data
    });
  }

  updateShow(show:Boolean) {
    this.historyShow = !this.historyShow
  }
  updateShowTransaction(show:Boolean) {
    this.transactionShow  = !this.transactionShow 
  }
  updateShowCreate(show:Boolean) {
    this.createShow = !this.createShow
    this.bankService.getAllBanks().subscribe((data: any) => {
      console.log({ data });
      this.allBanks = data
    });
  }


  createShowFunction() {
    this.createShow = !this.createShow
  }
  transactionShowFunction() {
    this.transactionShow = !this.transactionShow
  }
  typeIncomeFunction(bank: any) {
    this.type = 'income'
    this.bankSelected = bank._id
    this.transactionShow = !this.transactionShow
  }
  typeExpenseFunction(bank: any) {
    this.type = 'expense'
    this.bankSelected = bank._id
    this.transactionShow = !this.transactionShow
  }

  historyShowFunction(bank: any) {
    this.bankSelected = bank._id
    this.historyShow = !this.historyShow
  }



}
