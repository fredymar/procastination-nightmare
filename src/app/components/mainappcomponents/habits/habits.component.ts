import { Component, LOCALE_ID, Inject, OnInit } from '@angular/core';
import { format, eachDayOfInterval } from 'date-fns';
@Component({
  selector: 'app-habits',
  templateUrl: './habits.component.html',
  styleUrls: ['./habits.component.css']
})

export class HabitsComponent {
  actualDay: any;
  actualMonth: any;

  weekDays: string[] = [];
  hours: string[] = [];

  startTime = new Date();
  endTime = new Date();

  constructor () {
    this.startTime.setHours(5,0,0); //Establece la hora de inicio a las 5:00 am
    this.endTime.setHours(24,0,0) //Establece la hora de fin a las 24:00 pm (medianoche)

    while(this.startTime <= this.endTime) {
      const formattedHour = format(this.startTime, 'k:mm a');
      this.hours.push(formattedHour);
      this.startTime.setTime(this.startTime.getTime() + 60 * 60 * 1000); // Avanza 1 hora
    }
  }
    ngOnInit() {
      const today = new Date(); //Fecha y hora actual
      this.actualDay = format(today, 'dd')
      this.actualMonth = format(today, 'MMMM')
    
      const firstDayofWeek = new Date(today.setDate(today.getDate() - today.getDay()));
      const lastDayofWeek = new Date(today.setDate(firstDayofWeek.getDate() + 7));
      const intervalDays = eachDayOfInterval({ start: firstDayofWeek, end: lastDayofWeek });
  
      for (let i = 1; i < intervalDays.length; i++) {
        const weekDay = format(intervalDays[i], 'EEE');
        const monthDay = format(intervalDays[i], 'd');
        const completeDay = `${weekDay}/${monthDay}`;
        this.weekDays.push(completeDay);
      }
    }
  }
