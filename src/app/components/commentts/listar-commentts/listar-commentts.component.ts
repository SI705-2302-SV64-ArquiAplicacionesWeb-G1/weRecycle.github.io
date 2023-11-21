import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Comment } from 'src/app/models/commentts';
import { CommenttsService } from 'src/app/services/commentts.service';

@Component({
  selector: 'app-listar-commentts',
  templateUrl: './listar-commentts.component.html',
  styleUrls: ['./listar-commentts.component.css']
})
export class ListarCommenttsComponent implements OnInit {
  dataSource: MatTableDataSource<Comment> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  displayedColumns: string[]=[
    'idComment',
    'idPulication',
    'description'
  ];

  constructor(private uS:CommenttsService){}
  ngOnInit(): void {
    this.uS.list().subscribe((data)=>{
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this. uS.getlist().subscribe((data)=>{
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }
}
