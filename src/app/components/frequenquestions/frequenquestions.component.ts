import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-frequenquestions',
  templateUrl: './frequenquestions.component.html',
  styleUrls: ['./frequenquestions.component.css']
})
export class FrequenquestionsComponent {
  constructor(public route:ActivatedRoute){}
}
