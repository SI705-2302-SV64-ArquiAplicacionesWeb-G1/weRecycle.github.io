import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FrequenQuestions } from '../models/frequenQuestions';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class FrequenQuestionsService {

  private url = `${base_url}/frequentquestioncontroller`;
  private Listacambio = new Subject<FrequenQuestions[]>();

  constructor(private http: HttpClient) {}
  list() {
    let token = sessionStorage.getItem('token');
    return this.http.get<FrequenQuestions[]>(this.url,{
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

  insert(frec: FrequenQuestions) {
    let token = sessionStorage.getItem('token');
    return this.http.post(this.url, frec,{
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

  setList(listaNueva: FrequenQuestions[]) {
    this.Listacambio.next(listaNueva);
  }

  getList() {
    return this.Listacambio.asObservable();
  }
}
