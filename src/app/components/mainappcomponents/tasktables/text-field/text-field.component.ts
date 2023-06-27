import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-text-field',
  templateUrl: './text-field.component.html',
  styleUrls: ['./text-field.component.css']
})
export class TextFieldComponent {
  @Input() campo1:Boolean = false
  @Input() content:String = ""

  changeCampo1(){
    this.campo1= true
    setTimeout(()=>{ // this will make the execution after the above boolean has changed
      const me:any = document.querySelector("#myInput")
      me.setSelectionRange( -1, -1);
    },0);
    setTimeout(()=>{ // this will make the execution after the above boolean has changed
      const me:any = document.querySelector("#myInput")
      me.focus();
    },0);
  }
  changeCampo2(){
    const me:any = document.querySelector("#myInput")
    this.content= me.value
    this.campo1= false
  }
}
