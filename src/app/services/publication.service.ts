import { Injectable } from '@angular/core';

  import { Observable, Subject } from 'rxjs';
  import { environment } from 'src/environments/environment';
  import { Publication } from '../models/publication';
  import { HttpClient, HttpHeaders } from '@angular/common/http';
import { quantityPublicacionByTypeDTO } from '../models/quantityPublucationByTypeDTO';

  const base_url = environment.base;
  @Injectable({
    providedIn: 'root',
  })

export class PublicationService {
  private url = `${base_url}/PublicationController`;
  private listaCambio = new Subject<Publication[]>();
  constructor(private http: HttpClient) {}

  list() {
    let token = sessionStorage.getItem('token');
    return this.http.get<Publication[]>(this.url, {

      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

  insert(user: Publication) {
    let token = sessionStorage.getItem('token');
    return this.http.post(this.url, user, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

  setlist(listaNueva: Publication[]) {
    this.listaCambio.next(listaNueva);
  }

  getlist() {
    return this.listaCambio.asObservable();
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
  listId(id: number) {
    let token = sessionStorage.getItem('token');
    return this.http.get<Publication>(`${this.url}/${id}`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }


    update(p: Publication) {
      let token = sessionStorage.getItem('token');
      return this.http.put(this.url, p,{
        headers: new HttpHeaders()
          .set('Authorization', `Bearer ${token}`)
          .set('Content-Type', 'application/json'),
      });
    }

    getCount():Observable<quantityPublicacionByTypeDTO[]>{
      let token = sessionStorage.getItem('token');

    return this.http.get<quantityPublicacionByTypeDTO[]>(`${this.url}/cantidadPorTipo`, {

      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
    }
    
  }


