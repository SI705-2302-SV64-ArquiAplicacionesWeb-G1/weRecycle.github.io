import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EventUser } from '../models/eventuser';
import { HttpClient, HttpHeaders } from '@angular/common/http';
const base_url = environment.base;
@Injectable({
  providedIn: 'root',
})
export class EventuserService {
  private url = `${base_url}/eventsusercontroller`;
  private listaCambio = new Subject<EventUser[]>();
  constructor(private http: HttpClient) {}
  list(){
    let token = sessionStorage.getItem('token');
    return this.http.get<EventUser[]>(this.url,{
      headers: new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json'),
    });
  }
  insert(rec:EventUser)
  {
    let token = sessionStorage.getItem('token');
    return this.http.post(this.url, rec,{
      headers: new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json'),
    });
  }
  setlist(listaNueva: EventUser[]) {
    this.listaCambio.next(listaNueva);
  }
  getlist() {
    return this.listaCambio.asObservable();
  }

}
