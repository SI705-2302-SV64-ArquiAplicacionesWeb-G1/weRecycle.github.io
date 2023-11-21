import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TypeRecurso } from '../models/typerecurso';

const base_url=environment.base;

@Injectable({
  providedIn: 'root'
})
export class TypeRecursoService {

  private url = `${base_url}/TypeRecursoController`;
  private Listacambio = new Subject<TypeRecurso[]>();

  constructor(private http: HttpClient) {}
  list() {
    let token = sessionStorage.getItem('token');
    return this.http.get<TypeRecurso[]>(this.url,{
      headers: new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json'),
    });
  }

  insert(typere: TypeRecurso) {
    let token = sessionStorage.getItem('token');
    return this.http.post(this.url, typere,{
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

  setList(listaNueva: TypeRecurso[]) {
    this.Listacambio.next(listaNueva);
  }

  getList() {
    return this.Listacambio.asObservable();
  }
}
