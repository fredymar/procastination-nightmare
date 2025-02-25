import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tasktables',
  templateUrl: './tasktables.component.html',
  styleUrls: ['./tasktables.component.css']
})
export class TasktablesComponent {
  @Input() campo1:Boolean = false

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
    this.campo1= false
  }
}
