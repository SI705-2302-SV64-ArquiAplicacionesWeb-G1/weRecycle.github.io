import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-usermaterial',
  templateUrl: './usermaterial.component.html',
  styleUrls: ['./usermaterial.component.css']
})
export class UsermaterialComponent {
  constructor(public route:ActivatedRoute){}

}
