import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BankService } from 'src/app/api/bank/bank.service';
import { Bank } from 'src/app/models/bank.models';

@Component({
  selector: 'app-create-component',
  templateUrl: './create-component.component.html',
  styleUrls: ['./create-component.component.css']
})
export class CreateComponentComponent {
  @Input() createShow!: Boolean;
  @Input() bank!: String;
  @Input() functionShow!: Function;

  @Output() changeShow: EventEmitter<Boolean> = new EventEmitter<Boolean>();

  //Raise the event to send the data back to parent
  updateShowCreate() {
    this.changeShow.emit(this.createShow);
  }

  createShowFunction() {
    this.createShow = !this.createShow
  }
  constructor(public bankService: BankService) {}

  cleanForm() {
    this.bankService.bankToCreate = new Bank();
  }

  createBank(form: NgForm) {
    // revisar los campos
    let data = form.value
    console.log("hola")
    this.bankService.createBank(data).subscribe((data: any) => {
    });
    this.bankService.getAllBanks();
    this.updateShowCreate()
    this.cleanForm();
  }

}
