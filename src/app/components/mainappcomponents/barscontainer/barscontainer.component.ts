import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-barscontainer',
  templateUrl: './barscontainer.component.html',
  styleUrls: ['./barscontainer.component.css']
})
export class BarscontainerComponent {
  @Input() selection: string = ""
}
