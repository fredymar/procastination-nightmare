import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { EventInput } from '@fullcalendar/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EventInputs } from '../shared/event.model';



@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  modelTitle: string = "";
  event: EventInputs = {};

  @Output() eventSaved: EventEmitter<EventInputs> = new EventEmitter();
  @Output() eventDeleted: EventEmitter<EventInputs> = new EventEmitter();

  @ViewChild('content', { static: true }) content: any;
  constructor (public activeModal: NgbModal) { }


  ngOnInit(): void {
  }

  /**
   * opens modal
   * @param title title of modal
   * @param data data to be used in modal
   */
  openModal(title: string, data: any): void {
    this.modelTitle = title;
    this.event = { id: data['id'], title: data['title'], category: data['category'], start: data['start'], end: data['end'], classNames: data['classNames'], description: data['description'] };
    this.activeModal.open(this.content, { backdrop: "static" });

  }



  /**
   * stores event in calendar events
   */
  saveEvent() {
    this.eventSaved.emit(this.event);
    this.activeModal.dismissAll();
  }

  /**
   * deletes event from calendar events
   */
  deleteEvent() {
    this.eventDeleted.emit(this.event);
    this.activeModal.dismissAll();
  }


}
