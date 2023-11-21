import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Ubication } from '../models/ubication';


const base_url=environment.base;

@Injectable({
  providedIn: 'root'
})
export class UbicationService {
  private url=`${base_url}/ubications`;
  private listaCambio=new Subject<Ubication[]>();

  userLocation?:[number,number];
  get isUserLocationReady():boolean{
    return !!this.userLocation;
  }

  constructor(private http: HttpClient) {
   
   }

  
  list() {
    let token = sessionStorage.getItem('token');
    return this.http.get<Ubication[]>(this.url,{
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }


  insert(ubi: Ubication): Observable<Ubication> {
    let token = sessionStorage.getItem('token');
    return this.http.post<Ubication>(this.url, ubi,{
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

  setList(listaNueva: Ubication[]) {
    this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  listId(id: number) {
    let token = sessionStorage.getItem('token');
    return this.http.get<Ubication>(`${this.url}/${id}`,{
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
    }

  delete(id: number) {
    let token = sessionStorage.getItem('token');
    return this.http.delete(`${this.url}/${id}`,{
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

  update(u: Ubication) {
    let token = sessionStorage.getItem('token');
    return this.http.put(this.url, u,{
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
    }


}
