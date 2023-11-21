import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-eventuser',
  templateUrl: './eventuser.component.html',
  styleUrls: ['./eventuser.component.css']
})
export class EventuserComponent {
  constructor(public route:ActivatedRoute){}
}
