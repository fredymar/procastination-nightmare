import { Component, ViewChild } from '@angular/core';
import { FullCalendarComponent } from '@fullcalendar/angular'
import { CalendarOptions, EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent {

  event: EventInput = {};
  calendarEventsData: EventInput[] = [];
  isEditable: boolean = false;

  @ViewChild('calendar')
  calendarComponent!: FullCalendarComponent;

  // @ViewChild('eventModal', { static: true }) eventModal!: CalendarEventComponent;

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin]
  };

  // openEventModal(title: string = "", data: any = {}): void {
  //   this.eventModal.openModal(title, data);
  // }


  // createNewEvent(form: NgForm) {
  //   let data = form.value
  //   if(data._id) {
  //     this.productService.updateProduct(data).subscribe((data) =>{
  //       alert("producto actualizado")
  //       this.getAllProducts()
  //     })
  //     this.cleanForm()
  //     return
  //   }


}


