import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { EventModel } from 'src/app/components/mainappcomponents/calendar/shared/event.model';
import { map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EventService {

  urlApi = `${environment.API_URI}/event`
  eventToCreate: EventModel = new EventModel()
  allEvents: EventModel[] = []

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getAllEvents();
  }


  getAllEvents() {
    console.log(this.urlApi);
    return this.http.get<EventModel[]>(`${this.urlApi}/getEvent`);

  }


  createEvent(data: EventModel) {
    return this.http.post(`${this.urlApi}/createEvent`, data).pipe(
      map((response: any) => {
        data._id = response._id;
        return response;
      })
    );
  }


  deleteEvent(_id: string){
    return this.http.delete(`${this.urlApi}/deleteEvent/${_id}`)
  }

  updateEvent(data: EventModel){
    let dataToUpdate = {
      _id: data._id,
      dataToUpdate : data
    }
    return this.http.put(`${this.urlApi}/updateEvent`, dataToUpdate)
  }

  // getAllEvents() {
  //   console.log(this.urlApi)
  //   return this.http.get<EventModel[]>(`${this.urlApi}`);
  // }

  // createEvent(data: EventModel) {
  //   console.log(this.urlApi)
  //   return this.http.post<EventModel>(`${this.urlApi}`, data);
  // }

  // deleteEvent(eventId: string) {
  //   return this.http.delete(`${this.urlApi}/${eventId}`);
  // }

  // // updateEvent(eventId: string, data: EventModel) {

  // //   return this.http.put(`${this.urlApi}/${eventId}`, data);
  // // }

  // updateEvent(eventId : string, data: EventModel){
  //   let dataToUpdate = {
  //     _id: data._id,
  //     dataToUpdate : data
  //   }
  //   return this.http.put(`${this.urlApi}/updateEvent`, dataToUpdate)
  // }

}


