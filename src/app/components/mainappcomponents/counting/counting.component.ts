import { Component ,OnInit,Input} from '@angular/core';

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

  createShowFunction(){
    this.createShow = !this.createShow
  }
  transactionShowFunction(){
    this.transactionShow = !this.transactionShow
  }
  typeIncomeFunction(){
    this.type = 'income'
    this.transactionShow = !this.transactionShow
  }
  typeExpenseFunction(){
    this.type = 'expense'
    this.transactionShow = !this.transactionShow
  }

  historyShowFunction(){
    this.historyShow = !this.historyShow
  }



}
