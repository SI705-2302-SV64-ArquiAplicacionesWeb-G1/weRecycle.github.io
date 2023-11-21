import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-type-recurso',
  templateUrl: './type-recurso.component.html',
  styleUrls: ['./type-recurso.component.css']
})
export class TypeRecursoComponent {

  constructor(public route:ActivatedRoute){}
}
