import { Observable, Subject } from 'rxjs';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { RecyclingCenter } from '../models/RecyclingCenter';
import { HttpClient, HttpHeaders } from '@angular/common/http';
const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class RecyclingCenterService {
  private url=`${base_url}/RecyclingCenterController`;
  private listaCambio=new Subject<RecyclingCenter[]>();


  constructor(private http:HttpClient) {
    
   }

   list() {
    let token = sessionStorage.getItem('token');
    return this.http.get<RecyclingCenter[]>(this.url,{
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }


  insert(rec: RecyclingCenter) {
    let token = sessionStorage.getItem('token');
    return this.http.post(this.url, rec,{
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

  setList(listaNueva: RecyclingCenter[]) {
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

  update(rec: RecyclingCenter) {
    let token = sessionStorage.getItem('token');
    return this.http.put(this.url, rec,{
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }


    getCentroForUser(userId: number): Observable<RecyclingCenter[]> {
      let token = sessionStorage.getItem('token');
      const urlWithUserId = `${this.url}/mi-centro/${userId}`;
      return this.http.get<RecyclingCenter[]>(urlWithUserId,{
        headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
      });
    }


    listId(id: number) {
      let token = sessionStorage.getItem('token');
      return this.http.get<RecyclingCenter>(`${this.url}/centro-por-id/${id}`,{
        headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
      });
    }

}
