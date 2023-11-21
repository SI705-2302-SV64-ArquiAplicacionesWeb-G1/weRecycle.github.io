import { Component} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-useror',
  templateUrl: './useror.component.html',
  styleUrls: ['./useror.component.css']
})
export class UserorComponent {
  constructor(public route:ActivatedRoute){}
}
