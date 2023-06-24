import { Component, ViewChild, signal, ChangeDetectorRef } from '@angular/core';
import { FullCalendarComponent } from '@fullcalendar/angular'
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction'
import { NgForm } from '@angular/forms';
import { EventService } from 'src/app/api/events/event.service';
import { Event } from 'src/app/models/event.models';
import bootstrapPlugin from '@fullcalendar/bootstrap';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { INITIAL_EVENTS, createEventId } from './event-utils';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent {

  calendarVisible = signal(true);
  calendarOptions = signal<CalendarOptions>({
    plugins: [
      interactionPlugin,
      dayGridPlugin,
      timeGridPlugin,
      listPlugin,
    ],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    initialView: 'dayGridMonth',
    initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this)
    /* you can update a remote database when these fire:
    eventAdd:
    eventChange:
    eventRemove:
    */
  });
  currentEvents = signal<EventApi[]>([]);

  constructor(private changeDetector: ChangeDetectorRef) {
  }




  handleDateSelect(selectInfo: DateSelectArg) {
    // const  = prompt('Please enter a new title for your event');

    const title: any = document.getElementById('event-modal')
    title.addEventListener('hidden.bs.modal', (event: any) => {
  // do something...
})


    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      });
    }
  }

  handleEventClick(clickInfo: EventClickArg, remove: boolean = false) {
    console.log({ev: clickInfo.event})
    const calendarApi: any = clickInfo.view.calendar
    console.log(calendarApi.getEvents().filter((e: any) => e.title))

    remove = true

    if(remove){
      clickInfo.event.remove()
      return
    }

    clickInfo.event.remove()
    calendarApi.addEvent({
      id: createEventId(),
      title: "otro evento",
      start: new Date(),
      end: new Date(),
      allDay: true,
    })

  }

  handleEvents(events: EventApi[]) {
    this.currentEvents.set(events);
    this.changeDetector.detectChanges(); // workaround for pressionChangedAfterItHasBeenCheckedError
  }
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


