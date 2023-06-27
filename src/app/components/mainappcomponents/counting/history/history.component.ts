import { Component,Input,OnInit, Output, EventEmitter  } from '@angular/core';
import { BankService } from 'src/app/api/bank/bank.service';
import { Bank } from 'src/app/models/bank.models';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent {
  @Input() transactionShow!: Boolean;
  @Input() bank!: string;
  bankData:any = []
  toEdit = false
  transactionToEdit:any = {}

  constructor(public bankService: BankService) {}

  ngOnInit(): void {
    this.getTransactions()
  }

  @Output() changeShow: EventEmitter<Boolean> = new EventEmitter<Boolean>();

  //Raise the event to send the data back to parent
  updateShow() {
    this.changeShow.emit(this.transactionShow);
  }

  getTransactions() {
    // revisar los campos
    this.bankService.getBank(this.bank).subscribe((data: any) => {
      console.log(data);
      this.bankData = data.transaction
    });
  }

  deleteTransaction(_id:string) {
    // revisar los campos
    this.bankService.deleteTransaction(_id).subscribe((data: any) => {
      console.log({ data });
    });
    this.getTransactions()
  }

  toEditFunction(transaction: any){
    this.toEdit = !this.toEdit
    this.transactionToEdit = transaction
    this.bankService.transactionToCreate.value = transaction.value
    this.bankService.transactionToCreate.description = transaction.description
  }

  updateTransaction() {
    this.toEdit = !this.toEdit
    let data : any = {
      _id:this.transactionToEdit._id,
      type: this.transactionToEdit.type,
      value:this.bankService.transactionToCreate.value,
      description: this.bankService.transactionToCreate.description,
    }
    // revisar los campos
    this.bankService.updateTransaction(data).subscribe((data: any) => {
      console.log({ data });
    });
    this.getTransactions()
  }
}
