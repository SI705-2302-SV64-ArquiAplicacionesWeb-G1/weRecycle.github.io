import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Roles } from '../models/roles';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UsuarioRolDTO } from '../models/usuarioRolDTO';
const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class RolesService {
  private url = `${base_url}/typeusers`;
  private listaCambio = new Subject<Roles[]>();
  constructor(private http:HttpClient) { }

  list() {
    let token = sessionStorage.getItem('token');
    return this.http.get<Roles[]>(this.url,{
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  insert(rol: Roles) {
    let token = sessionStorage.getItem('token');
    return this.http.post(this.url, rol,{
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

  setlist(listaNueva: Roles[]) {
    this.listaCambio.next(listaNueva);
  }

  getlist() {
    return this.listaCambio.asObservable();
  }

  delete(id:number){
    let token = sessionStorage.getItem('token');
    return this.http.delete(`${this.url}/${id}`,{
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

  getCount(): Observable<UsuarioRolDTO[]> {
    let token = sessionStorage.getItem('token');
    return this.http.get<UsuarioRolDTO[]>(`${this.url}/usuario-cantidad`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
}
