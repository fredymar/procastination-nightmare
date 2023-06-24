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
import { EventInputs } from './shared/event.model';
import esLocale from '@fullcalendar/core/locales/es';

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
  event: EventInputs = {
    classNames: undefined,
    category: ''
  };
  // externalEvents: ExternalEvent[] = [];
  //reference to full calender element
  @ViewChild('calendar')
  calendarComponent!: FullCalendarComponent;

  @ViewChild('eventModal', { static: true }) eventModal!: EventComponent;

  constructor() {}

  ngOnInit(): void {
    this._fetchData();
    this.initCalendar();
  }

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
  _fetchData(): void {
    this.calendarEventsData = CALENDAREVENTS;
    console.log(this.calendarEventsData)
    // this.externalEvents = EXTERNALEVENTS;

  }

  /**
   * Opens event modal
   * @param title title of modal
   * @param data data to be used in modal
   */
  openEventModal(title: string = '', data: any = {}): void {
    this.eventModal.openModal(title, data);

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
      description: ''
    };
    this.isEditable = false;
    this.openEventModal('Agregar nuevo evento', this.event);
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
    console.log(this.calendarEventsData)
  }

  /**
   * Handling date click on calendar
   * @param arg DateClickArg
   */
  handleDateClick(arg: DateClickArg): void {
    this.selectedDay = arg;
    this.event = {
      id: String(this.calendarEventsData.length + 1),
      title: '',
      classNames: '',
      category: 'bg-danger',
      start: this.selectedDay.date,
      end: this.selectedDay.date,
      description: ''
    };
    this.isEditable = false;
    this.openEventModal('Agregar nuevo evento', this.event);
  }

  /**
   * Handling click on event on calendar
   * @param arg EventClickArg
   */
  handleEventClick(arg: EventClickArg): void {
  const event = arg.event;
  this.event = {
    id: String(event.id),
    title: event.title,
    classNames: event.classNames,
    category: event.classNames[0],
    start: event.start || undefined,
    end: event.end || undefined,
    description: event.extendedProps["description"], // Agrega la propiedad de descripción
  };
  this.isEditable = true;
  this.openEventModal('Editar evento', this.event);
}

  /**
   * Handle the event save
   * @param newEvent new event
   */
  handleEventSave(newEvent: EventInput): void {
    if (this.isEditable) {
      let modifiedEvents = [...this.calendarEventsData];
      const eventIndex = modifiedEvents.findIndex(
        (event) => event.id === newEvent.id
      );
      this.calendarEventsData[eventIndex].title = newEvent.title;
      this.calendarEventsData[eventIndex].classNames = newEvent['category'];
      this.calendarEventsData[eventIndex].start = new Date(newEvent.start as string);
this.calendarEventsData[eventIndex].end = new Date(newEvent.end as string);

      // this.calendarEventsData[eventIndex].description = newEvent.description;
      this.calendarEventsData = modifiedEvents;
      this.isEditable = false;

    } else {
      let nEvent = {
        id: newEvent.id,
        title: newEvent.title,
        start: new Date(newEvent.start as string) || undefined,
  end: new Date(newEvent.end as string) || undefined,
        description: newEvent['description'],
        classNames: newEvent['category'],
      };
      this.calendarEventsData.push(nEvent);
    }
    this.calendarOptions.events = [...this.calendarEventsData];
    console.log(this.event, this.calendarEventsData)
  }

  /**
   * Deletes calendar event
   * @param deleteEvent event to be deleted
   */
  handleEventDelete(deleteEvent: EventInput): void {
    let modifiedEvents = [...this.calendarEventsData];
    const eventIndex = modifiedEvents.findIndex(
      (event) => event.id === deleteEvent.id
    );
    modifiedEvents.splice(eventIndex, 1);
    this.calendarEventsData = modifiedEvents;
    this.calendarOptions.events = [...this.calendarEventsData];
  }

  // modelTitle: string = "";
  // event: EventInput = {};

  // @Output() eventSaved: EventEmitter<EventInput> = new EventEmitter();
  // @Output() eventDeleted: EventEmitter<EventInput> = new EventEmitter();

  // @ViewChild('content', { static: true }) content: any;

  // calendarVisible = signal(true);
  // calendarOptions = signal<CalendarOptions>({
  //   plugins: [
  //     interactionPlugin,
  //     dayGridPlugin,
  //     timeGridPlugin,
  //     listPlugin,
  //   ],
  //   headerToolbar: {
  //     left: 'prev,next today',
  //     center: 'title',
  //     right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
  //   },
  //   initialView: 'dayGridMonth',
  //   initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
  //   weekends: true,
  //   editable: true,
  //   selectable: true,
  //   selectMirror: true,
  //   dayMaxEvents: true,
  //   select: this.handleDateSelect.bind(this),
  //   eventClick: this.handleEventClick.bind(this),
  //   eventsSet: this.handleEvents.bind(this)
  //   /* you can update a remote database when these fire:
  //   eventAdd:
  //   eventChange:
  //   eventRemove:
  //   */
  // });
  // currentEvents = signal<EventApi[]>([]);

  // constructor(private changeDetector: ChangeDetectorRef) {
  // }

  // handleDateSelect(selectInfo: DateSelectArg) {
  //   const title = prompt('Please enter a new title for your event');

  //   const calendarApi = selectInfo.view.calendar;

  //   calendarApi.unselect(); // clear date selection

  //   if (title) {
  //     calendarApi.addEvent({
  //       id: createEventId(),
  //       title,
  //       start: selectInfo.startStr,
  //       end: selectInfo.endStr,
  //       allDay: selectInfo.allDay
  //     });
  //   }
  // }

  // handleEventClick(clickInfo: EventClickArg, remove: boolean = false) {
  //   console.log({ev: clickInfo.event})
  //   const calendarApi: any = clickInfo.view.calendar
  //   console.log(calendarApi.getEvents().filter((e: any) => e.title))

  //   // remove = true

  //   if(remove){
  //     clickInfo.event.remove()
  //     return
  //   }

  //   clickInfo.event.remove()
  //   calendarApi.addEvent({
  //     id: createEventId(),
  //     title: "otro evento",
  //     start: new Date(),
  //     end: new Date(),
  //     allDay: true,
  //   })

  // }

  // handleEvents(events: EventApi[]) {
  //   this.currentEvents.set(events);
  //   this.changeDetector.detectChanges(); // workaround for pressionChangedAfterItHasBeenCheckedError
  // }
}

//   constructor(public eventService: EventService){}

//   ngOnInit(){
//     this.getAllEvents()
//   }

//   cleanForm(){
//     this.eventService.eventToCreate = new Event()
//   }

//   createOrUpdateEvent(form: NgForm) {
//     let data = form.value
//     if(data._id) {
//       this.eventService.updateEvent(data).subscribe((data) =>{
//         alert("Evento actualizado")
//         this.getAllEvents()
//       })
//       this.cleanForm()
//       return
//     }

//     delete(data._id)

//     this.eventService.createEvent(data).subscribe((data) =>{
//       console.log({data})
//       this.getAllEvents()
//       this.cleanForm()
//     })
//   }

//   getAllEvents(){
//     this.eventService.getAllEvents().subscribe((data: any)=>{
//       this.eventService.allEvents = data.result || []
//       console.log(data)
//     })
//   }

//   deleteEvent(_id: string){
//     this.eventService.deleteEvent(_id).subscribe((data) =>{
//       alert("Evento Eliminado")
//       this.getAllEvents()
//     })
//   }

//   updateProduct(event : Event){
//     this.eventService.eventToCreate = event
//   }

// }
