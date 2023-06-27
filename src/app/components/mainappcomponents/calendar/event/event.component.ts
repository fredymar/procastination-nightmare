import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// import { EventInputs } from '../shared/event.model';
import { EventInput } from '@fullcalendar/core';
import { NgForm } from '@angular/forms';
import { EventService } from 'src/app/api/events/event.service';
import { EventInputs, EventModel } from '../shared/event.model';



@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  modelTitle: string = "";
  event: EventInput = {
    tareas: []
  };

  @Output() eventSaved: EventEmitter<EventInput> = new EventEmitter();
  @Output() eventDeleted: EventEmitter<EventInput> = new EventEmitter();

  @ViewChild('content', { static: true }) content: any;
  constructor (public activeModal: NgbModal, public eventService : EventService) { }


  ngOnInit(): void {

  }

  /**
   * opens modal
   * @param title title of modal
   * @param data data to be used in modal
   */
  openModal(title: string, data: any): void {
    this.modelTitle = title;
    this.event = { id: data['id'], title: data['title'], category: data['category'], start: data['start'], end: data['end'], classNames: data['classNames'], description: data['description'], tareas:data['tareas'], _id: data['_id'] };
    this.activeModal.open(this.content, { backdrop: "static" });

  }

  cleanForm() {
    this.eventService.eventToCreate = new EventModel();
  }

  /**
   * stores event in calendar events
   */
  // createEvent(form: NgForm) {
  //   let data = this.event
  //   this.eventService.createEvent(data).subscribe((data: any) => {
  //     this.eventService.getAllEvents();
  //     console.log("Evento Guardado")
  //   });
  //   this.eventSaved.emit(this.event);
  //   this.activeModal.dismissAll();
  // }



  createEventOrUpdate() {
    this.eventSaved.emit(this.event);
    this.activeModal.dismissAll();
    let data = this.event
    console.log(data)
    if(data['_id']) {
      this.eventService.updateEvent(data).subscribe((data) =>{
        alert("Evento actualizado")
        this.getAllEvents()
      })
      return
    }

    delete(data['_id'])

    this.eventService.createEvent(data).subscribe((data) =>{
      console.log({data})
      this.getAllEvents()
    })
  }


  // updateEvent(){
  //   let data = this.event
  //   if(data.id === this.event.id){}
  // }

  getAllEvents(){
    let data = this.event
    this.eventService.getAllEvents().subscribe((data: any)=>{
      this.eventService.allEvents= data.result || []
      console.log(data)
    })
  }

  /**
   * deletes event from calendar events
   */


  deleteEvent(_id: string){
    let eventId = this.event["_def"].id
    console.log(eventId)
    this.eventService.deleteEvent(eventId).subscribe((data) =>{
      alert("Evento Eliminado")
      this.getAllEvents()
    })
  }

  saveTarea(tarea: any) {
    console.log("Tarea guardada:", tarea);
    tarea.editable = false;
  }


  deleteTarea(tarea: any) {
    if (this.event['tareas']) {
      const index = this.event['tareas'].indexOf(tarea);

      if (index > -1) {
        this.event['tareas'].splice(index, 1);
        console.log("Tarea eliminada:", tarea);
      }
    }
  }

  nuevaTarea: string = "";

  agregarTarea() {
    console.log(this.event['tareas'])
    console.log(this.event['tareas'])
    if (this.event['tareas']) {
      this.event['tareas'].push({
        list: this.nuevaTarea,
        editable: false
      });
      this.nuevaTarea = "";
    }
  }


}
