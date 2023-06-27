import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EventInput } from '@fullcalendar/core';
import { NgForm } from '@angular/forms';
import { EventService } from 'src/app/api/events/event.service';
import { EventInputs, EventModel } from '../shared/event.model';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css'],
})
export class EventComponent implements OnInit {
  modelTitle: string = '';
  event: EventInput = {
    tareas: [],
  };
  isCreatingEvent: boolean = true;
  isEditable: boolean = false;

  @Output() eventSaved: EventEmitter<EventInput> = new EventEmitter();
  @Output() eventDeleted: EventEmitter<EventInput> = new EventEmitter();

  @ViewChild('content', { static: true }) content: any;
  constructor(
    public activeModal: NgbModal,
    public eventService: EventService
  ) {}

  ngOnInit(): void {}

  /**
   * opens modal
   * @param title title of modal
   * @param data data to be used in modal
   */
  openModal(title: string, data: any, isCreating: boolean): void {
    this.modelTitle = title;
    this.event = {
      id: data.id,
      title: data['title'],
      category: data['category'],
      start: data['start'],
      end: data['end'],
      classNames: data['classNames'],
      description: data['description'],
      tareas: data['tareas'],
      _id: data._id,
    };
    this.isEditable = !isCreating;
    this.isCreatingEvent = isCreating;
    this.activeModal.open(this.content, { backdrop: 'static' });
  }

  createEvent() {
    this.eventSaved.emit(this.event);
    this.activeModal.dismissAll();

    let data = this.event;
    console.log(data);
    this.eventService.createEvent(data).subscribe((response: any) => {
      const createdEvent = response.data;
      console.log({ createdEvent });
      this.getAllEvents();
    });
  }


  getAllEvents() {
    this.eventService.getAllEvents().subscribe((data: any) => {
      this.eventService.allEvents = data.result;
      console.log(data);
    });
  }

  deleteEvent(_id: string) {
    this.eventService.deleteEvent(_id).subscribe((data) => {
      alert('Evento Eliminado');
      this.getAllEvents();
    });
    this.eventDeleted.emit(this.event);
    this.activeModal.dismissAll();
  }

  updateEvent() {
    this.eventService.updateEvent(this.event).subscribe((response: any) => {
      // Manejar la respuesta del servidor si es necesario
      alert('Evento actualizado');
      this.getAllEvents(); // Obtener la lista actualizada de eventos
      this.activeModal.dismissAll(); // Cerrar el modal
    });
  }

  saveTarea(tarea: any) {
    console.log('Tarea guardada:', tarea);
    tarea.editable = false;
  }

  deleteTarea(tarea: any) {
    if (this.event['tareas']) {
      const index = this.event['tareas'].indexOf(tarea);

      if (index > -1) {
        this.event['tareas'].splice(index, 1);
        console.log('Tarea eliminada:', tarea);
      }
    }
  }

  nuevaTarea: string = '';

  agregarTarea() {
    console.log(this.event['tareas']);
    console.log(this.event['tareas']);
    if (this.event['tareas']) {
      this.event['tareas'].push({
        list: this.nuevaTarea,
        editable: false,
      });
      this.nuevaTarea = '';
    }
  }
}
