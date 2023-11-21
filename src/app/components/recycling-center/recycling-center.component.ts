import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recycling-center',
  templateUrl: './recycling-center.component.html',
  styleUrls: ['./recycling-center.component.css']
})
export class RecyclingCenterComponent {

  constructor(public route:ActivatedRoute){ }
}
