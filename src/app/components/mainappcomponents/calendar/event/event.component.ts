import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// import { EventInputs } from '../shared/event.model';
import { EventInput } from '@fullcalendar/core';
import { NgForm } from '@angular/forms';
import { EventService } from 'src/app/api/events/event.service';
import { EventInputs, EventModel } from '../shared/event.model';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  modelTitle: string = "";
  event: EventInputs = {
    tareas: []
  };

  @Output() eventSaved: EventEmitter<EventInput> = new EventEmitter();
  @Output() eventDeleted: EventEmitter<EventInput> = new EventEmitter();

  @ViewChild('content', { static: true }) content: any;
  constructor (public activeModal: NgbModal, public eventService : EventService) { }


  ngOnInit(): void {
    console.log(this.event)
  }

  /**
   * opens modal
   * @param title title of modal
   * @param data data to be used in modal
   */
  openModal(title: string, data: any): void {
    this.modelTitle = title;
    this.event = { id: data['id'], title: data['title'], category: data['category'], start: data['start'], end: data['end'], classNames: data['classNames'], description: data['description'], tareas:data['tareas'] };
    this.activeModal.open(this.content, { backdrop: "static" });

  }

  cleanForm() {
    this.eventService.eventToCreate = new EventModel();
  }

  /**
   * stores event in calendar events
   */
  createEvent(form: NgForm) {
    this.eventSaved.emit(this.event);
    this.activeModal.dismissAll();
    let data = this.event
    console.log("Evento Guardado")
    this.eventService.createEvent(data).subscribe((data: any) => {
      console.log(data);
      this.eventService.getAllEvents();
      this.cleanForm();
    });

  }

  // createEvent(form: NgForm) {

  //   this.activeModal.dismissAll();
  //   let data = this.event
  //   if(data.id) {
  //     this.eventService.updateEvent(data).subscribe((data) =>{
  //       this.eventSaved.emit(this.event);
  //       alert("Evento actualizado")
  //       this.eventService.getAllEvents()
  //     })
  //     this.cleanForm()
  //     return
  //   }

  //   delete(data.id)

  //   this.eventService.createEvent(data).subscribe((data) =>{
  //     this.eventSaved.emit(this.event);
  //     console.log({data})
  //     this.eventService.getAllEvents()
  //     this.cleanForm()
  //   })
  // }

  /**
   * deletes event from calendar events
   */
  deleteEvent() {
    this.eventDeleted.emit(this.event);
    this.activeModal.dismissAll();
  }

  saveTarea(tarea: any) {
    console.log("Tarea guardada:", tarea);
    tarea.editable = false;
  }


  deleteTarea(tarea: any) {
    if (this.event.tareas) {
      const index = this.event.tareas.indexOf(tarea);

      if (index > -1) {
        this.event.tareas.splice(index, 1);
        console.log("Tarea eliminada:", tarea);
      }
    }
  }

  nuevaTarea: string = "";

  agregarTarea() {
    console.log(this.event.tareas)
    console.log(this.event.tareas)
    if (this.event.tareas) {
      this.event.tareas.push({
        list: this.nuevaTarea,
        editable: false
      });
      this.nuevaTarea = "";
    }
  }


}
