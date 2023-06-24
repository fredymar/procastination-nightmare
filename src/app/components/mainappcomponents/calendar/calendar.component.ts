import { Component, ViewChild } from '@angular/core';
import { FullCalendarComponent } from '@fullcalendar/angular'
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { NgForm } from '@angular/forms';
import { EventService } from 'src/app/api/events/event.service';
import { Event } from 'src/app/models/event.models';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent {

  @ViewChild('calendar')
  calendarComponent!: FullCalendarComponent;

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin]
  };

  constructor(public eventService: EventService){}

  ngOnInit(){
    this.getAllEvents()
  }

  cleanForm(){
    this.eventService.eventToCreate = new Event()
  }

  createOrUpdateEvent(form: NgForm) {
    let data = form.value
    if(data._id) {
      this.eventService.updateEvent(data).subscribe((data) =>{
        alert("Evento actualizado")
        this.getAllEvents()
      })
      this.cleanForm()
      return
    }

    delete(data._id)

    this.eventService.createEvent(data).subscribe((data) =>{
      console.log({data})
      this.getAllEvents()
      this.cleanForm()
    })
  }

  getAllEvents(){
    this.eventService.getAllEvents().subscribe((data: any)=>{
      this.eventService.allEvents = data.result || []
      console.log(data)
    })
  }

  deleteEvent(_id: string){
    this.eventService.deleteEvent(_id).subscribe((data) =>{
      alert("Evento Eliminado")
      this.getAllEvents()
    })
  }

  updateProduct(event : Event){
    this.eventService.eventToCreate = event
  }


}


