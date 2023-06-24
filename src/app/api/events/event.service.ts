import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Event } from 'src/app/models/event.models';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  urlApi = `${environment.API_URI}/event`
  eventToCreate: Event = new Event()
  allEvents: Event[] = []
  constructor(private http: HttpClient) {
  }

  //metodos que van a consumir el api
  getAllEvents(){
    console.log(this.urlApi)
    return this.http.get(`${this.urlApi}/getEvent`)
  }

  createEvent(data: Event){
    return this.http.post(`${this.urlApi}/createEvent`, data)
  }

  deleteEvent(_id: string){
    return this.http.delete(`${this.urlApi}/deleteEvent/${_id}`)
  }

  updateEvent(data: Event){
    let dataToUpdate = {
      _id: data._id,
      dataToUpdate : data
    }
    return this.http.put(`${this.urlApi}/updateEvent`, dataToUpdate)
  }
}
