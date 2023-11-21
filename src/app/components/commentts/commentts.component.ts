import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Comment} from 'src/app/models/commentts';
import { CommenttsService } from 'src/app/services/commentts.service';

@Component({
  selector: 'app-commentts',
  templateUrl: './commentts.component.html',
  styleUrls: ['./commentts.component.css']
})
export class CommenttsComponent {
 constructor(public route:ActivatedRoute){}
}
