import { Component} from '@angular/core';
import { ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-recyclable-material',
  templateUrl: './recyclable-material.component.html',
  styleUrls: ['./recyclable-material.component.css'],
})
export class RecyclableMaterialComponent{
  constructor(public route:ActivatedRoute){}
}