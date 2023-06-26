import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { EventModel } from 'src/app/components/mainappcomponents/calendar/shared/event.model';
import { filter, map } from 'rxjs/operators';
import { EventInputs } from 'src/app/components/mainappcomponents/calendar/shared/event.model';


interface Event {
  type: string;
  payload?: string;
}

//Defines event callback
type EventCallback = (payload: any) => void;

@Injectable({
  providedIn: 'root'
})
export class EventService {

  urlApi = `${environment.API_URI}/event`
  eventToCreate: EventModel = new EventModel()
  allEvents: EventModel[] = []


  private handler = new Subject<Event>();
  constructor(private http: HttpClient) { }

  /**
   * Broadcast the event
   * @param type type of event
   * @param payload payload
   */
  broadcast(type: string, payload: any = ""): void {
    this.handler.next({ type, payload });
  }

  /**
   * Subscribe to event
   * @param type type of event
   * @param callback call back function
   */
  subscribe(type: string, callback: EventCallback): Subscription {
    return this.handler.pipe(
      filter((event) => event.type === type)).pipe(
        map(event => event.payload))
      .subscribe(callback);
  }

  //   getAllEvents(){
  //   console.log(this.urlApi)
  //   return this.http.get(`${this.urlApi}/getEvent`)
  // }

  getAllEvents() {
    console.log(this.urlApi);
    return this.http.get<EventInputs[]>(`${this.urlApi}/getEvent`);

  }


  createEvent(data: EventModel) {
    return this.http.post(`${this.urlApi}/createEvent`, data).pipe(
      map((response: any) => {
        // Asignar el ID generado al evento creado
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

}
