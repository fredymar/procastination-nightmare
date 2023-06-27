import { Component, OnInit, ViewChild } from '@angular/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import {
  CalendarOptions,
  EventClickArg,
  EventDropArg,
  EventInput,
} from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, {
  DateClickArg,
  Draggable,
} from '@fullcalendar/interaction';
import bootstrapPlugin from '@fullcalendar/bootstrap';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { EventComponent } from './event/event.component';
import { CALENDAREVENTS } from './shared/data';
import { EventInputs, EventModel } from './shared/event.model';
import esLocale from '@fullcalendar/core/locales/es';
import { EventService } from 'src/app/api/events/event.service';




@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent implements OnInit {
  calendarOptions: CalendarOptions = {};
  calendarEventsData: EventInputs[] = [];
  selectedDay: any = {};
  isEditable: boolean = false;
  event: EventModel = {
    tareas:[]
  };
  // externalEvents: ExternalEvent[] = [];
  //reference to full calender element
  @ViewChild('calendar')
  calendarComponent!: FullCalendarComponent;

  @ViewChild('eventModal', { static: true }) eventModal!: EventComponent;

  constructor(public eventService : EventService) {}

  ngOnInit(): void {
    this.initCalendar();
    this.eventService.getAllEvents().subscribe((events: any) => {
      this.calendarEventsData = events.result;
      // this._fetchData();
      // Asignar una copia de los eventos al calendario
      this.calendarOptions.events = [...this.calendarEventsData];
      console.log(events.result);
      console.log(this.event)

    });

  }

  // ngOnInit(): void {
  //   this._fetchData();
  //   this.initCalendar();
  // }

  ngAfterViewInit(): void {
    new Draggable(document.getElementById('external-events')!, {
      itemSelector: '.external-event',
    });
  }

  /**
   * initialize calendar config
   */
  initCalendar(): void {
    // full calendar config
    this.calendarOptions = {
      plugins: [
        dayGridPlugin,
        interactionPlugin,
        bootstrapPlugin,
        timeGridPlugin,
        listPlugin,
      ],
      themeSystem: 'bootstrap',
      bootstrapFontAwesome: false,
      buttonText: {
        today: 'Hoy',
        month: 'Mes',
        week: 'Semana',
        day: 'Dia',
        list: 'Lista',
        prev: 'Antes',
        next: 'Siguiente',
      },
      titleFormat: {
        // will produce something like "Tuesday, September 18, 2018"
        day: '2-digit',
        month: 'long',
      },
      locale: esLocale,
      timeZone: 'local',
      initialView: 'dayGridMonth',
      handleWindowResize: true,
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth',
      },
      events: [...this.calendarEventsData],
      editable: true,
      droppable: true, // this allows things to be dropped onto the calendar
      selectable: true,
      dateClick: this.handleDateClick.bind(this),
      eventClick: this.handleEventClick.bind(this),
      drop: this.onDrop.bind(this),
      eventDrop: this.onEventDrop.bind(this),
    };
  }

  /**
   * fetches events
   */
  // _fetchData(): void {
  //   this.calendarEventsData = CALENDAREVENTS;
  //   // console.log(this.calendarEventsData)
  //   // this.externalEvents = EXTERNALEVENTS;

  // }

  /**
   * Opens event modal
   * @param title title of modal
   * @param data data to be used in modal
   */
  openEventModal(title: string = '', data: any = {}, isCreating: boolean = false): void {
    this.eventModal.openModal(title, data, isCreating);

  }

  /**
   * Creates new event for today
   */
  createNewEvent(): void {
    this.event = {
      id: String(this.calendarEventsData.length + 1),
      title: '',
      classNames: '',
      category: 'bg-danger',
      start: new Date(),
      end: new Date(),
      description: '',
      tareas: []
    };
    this.isEditable = false;
    this.openEventModal('Agregar nuevo evento', this.event, true);
  }

  /**
   * adds external events by Drag n Drop
   * @param event dropped event
   */
  onDrop(event: any): void {
    const draggedEl = event.draggedEl;
    const newEvent = {
      id: String(this.calendarEventsData.length + 1),
      title: draggedEl.innerText,
      start: event.date,
      end: event.date,
      classNames: 'bg-' + draggedEl.getAttribute('data-type'),
      description: draggedEl.innerText
    };
    // save new event
    this.calendarEventsData.push(newEvent);
    this.calendarOptions.events = [...this.calendarEventsData];
  }

  /**
   * on event drop between calendar
   */
  onEventDrop(arg: EventDropArg): void {
    let modifiedEvents = [...this.calendarEventsData];
    const idx = modifiedEvents.findIndex((e: any) => e['id'] === arg.event.id);
    modifiedEvents[idx]['title'] = arg.event.title;
    modifiedEvents[idx]['classNames'] = arg.event.classNames;
    modifiedEvents[idx]['start'] = new Date(arg.event.start as unknown as string);
    modifiedEvents[idx]['end'] = new Date(arg.event.end as unknown as string);


    this.calendarEventsData = modifiedEvents;
    this.isEditable = false;
  }



  /**
   * Handling date click on calendar
   * @param arg DateClickArg
   */
  handleDateClick(arg: DateClickArg): void {
    // this.selectedDay = arg;
    console.log(this.event)
    this.event = {
      id: String(this.calendarEventsData.length + 1),
      title: '',
      classNames: '',
      category: 'bg-danger',
      start: new Date(),
      end: new Date(),
      description: '',
      tareas: []

    };
    this.isEditable = false;
    this.openEventModal('Agregar nuevo evento', this.event, true);
  }

  /**
   * Handling click on event on calendar
   * @param arg EventClickArg
   */
  handleEventClick(arg: EventClickArg): void {
  const event = arg.event;
  this.event = {
    id: String(event.id),
    _id: event.extendedProps['_id'],
    title: event.title,
    classNames: event.classNames,
    category: event.classNames[0],
    start: event.start,
    end: event.end,
    description: event.extendedProps["description"],
    tareas: event.extendedProps['tareas']
  };
  this.isEditable = true;
  this.openEventModal('Editar evento', this.event, false);
  console.log(this.event)
}

  /**
   * Handle the event save
   * @param newEvent new event
  */
 handleEventSave(newEvent: EventModel): void {
    if (this.isEditable) {
      let modifiedEvents = [...this.calendarEventsData];
      const eventIndex = modifiedEvents.findIndex(
        (event) => event.id === newEvent.id
        );
        this.calendarEventsData[eventIndex].title = newEvent.title;
        this.calendarEventsData[eventIndex].classNames = newEvent['category'];
        this.calendarEventsData = modifiedEvents;
        this.isEditable = false;

    } else {
      let nEvent = {
        id: newEvent.id,
        title: newEvent.title,
        start: new Date(newEvent.start) ,
        end: new Date(newEvent.end) ,
        description: newEvent['description'],
        classNames: newEvent['category'],
        tareas: newEvent['tareas']

      };
      this.calendarEventsData.push(nEvent);
    }
    this.calendarOptions.events = [...this.calendarEventsData];
  }

  /**
   * Deletes calendar event
   * @param deleteEvent event to be deleted
   */
  handleEventDelete(deleteEvent: EventModel): void {
    let modifiedEvents = [...this.calendarEventsData];
    const eventIndex = modifiedEvents.findIndex(
      (event) => event.id === deleteEvent.id
    );
    modifiedEvents.splice(eventIndex, 1);
    this.calendarEventsData = modifiedEvents;
    this.calendarOptions.events = [...this.calendarEventsData];
  }

  selectedEvent: any; // Propiedad para almacenar el evento seleccionado

  // Función que se ejecuta cuando se selecciona un evento
  onEventSelected(event: any) {
    this.selectedEvent = event;
  }

}
