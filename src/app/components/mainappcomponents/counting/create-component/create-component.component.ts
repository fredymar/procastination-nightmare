import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-create-component',
  templateUrl: './create-component.component.html',
  styleUrls: ['./create-component.component.css']
})
export class CreateComponentComponent {
  @Input() createShow!: Boolean;


  createShowFunction() {
    this.createShow = !this.createShow
  }

  createOrUpdateBank(form: NgForm) {
    let data = form.value
    console.log(data)
  }
}
