import { Observable, Subject, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Events } from '../models/events';
import { environment } from 'src/environments/environment';
import { Useror } from '../models/useror';
import { NumberOfEventsPerLocationDTO } from '../models/NumberOfEventsPerLocationDTO';

const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  private url=`${base_url}/EventsControlller`;
  private listaCambio=new Subject<Events[]>();

  constructor(private http:HttpClient) { }
  


  list() {
    let token = sessionStorage.getItem('token');
    return this.http.get<Events[]>(this.url,{
      headers: new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json'),
    })
  }


  insert(rec: Events) {
    let token = sessionStorage.getItem('token');
    return this.http.post(this.url, rec,{
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
    
  }

  setList(listaNueva: Events[]) {
    this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  delete(id: number) {
    let token = sessionStorage.getItem('token');
    return this.http.delete(`${this.url}/${id}`,{
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

  update(rec: Events) {
    let token = sessionStorage.getItem('token');
    return this.http.put(this.url, rec,{
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
    }

    getEventsForUser(userId: number): Observable<Events[]> {
      let token = sessionStorage.getItem('token');
      const urlWithUserId = `${this.url}/mis-eventos/${userId}`;
      return this.http.get<Events[]>(urlWithUserId,{
        headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
      });
    }

    listId(id: number) {
      let token = sessionStorage.getItem('token');
      return this.http.get<Events>(`${this.url}/evento-por-id/${id}`,{
        headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
      });
    }

   
  findByDate(fecha: string): Observable<Events[]> {
  let token = sessionStorage.getItem('token');
  const url = `${this.url}/evento-por-fecha`;
  const fechaF=fecha;

  return this.http.post<Events[]>(url, fechaF, {
    headers: new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json'),
  });
}


  getEventosPorUbicacion(ubicacion: string): Observable<Events[]> {
    let token = sessionStorage.getItem('token');

    return this.http.get<Events[]>(`${this.url}/evento-por-ubicacion/${ubicacion}`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
      });
  }

  getQuantityOfEventsForUbication():Observable<NumberOfEventsPerLocationDTO[]>{
    let token = sessionStorage.getItem('token');

    return this.http.get<NumberOfEventsPerLocationDTO[]>(`${this.url}/cantidaDeEventosPorUbicacion`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

}


    
