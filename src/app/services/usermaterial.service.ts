import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserMaterial } from './../models/usermaterial';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class UsermaterialService {
  private url = `${base_url}/MaterialUserControllet`;
  private listaCambio = new Subject<UserMaterial[]>();
  constructor(private http: HttpClient) {}
  list() {
    let token = sessionStorage.getItem('token');
    return this.http.get<[]>(this.url, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  insert(rec: UserMaterial) {
    let token = sessionStorage.getItem('token');
    console.log('Lista actualizada en el servicio wata:', rec);
    return this.http.post(this.url, rec, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

  setlist(listaNueva: UserMaterial[]) {
    this.listaCambio.next(listaNueva);
  }
  getlist() {
    return this.listaCambio.asObservable();
  }
}
