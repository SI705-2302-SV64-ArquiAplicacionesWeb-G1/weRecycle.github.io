import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Like } from 'src/app/models/like';
import { LikeService } from 'src/app/services/like.service';

@Component({
  selector: 'app-listar-like',
  templateUrl: './listar-like.component.html',
  styleUrls: ['./listar-like.component.css'],
})
export class ListarLikeComponent implements OnInit {
  dataSource: MatTableDataSource<Like> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = ['idLike',
   'idPublication'];
  constructor(private uS: LikeService) {}
  ngOnInit(): void {
    this.uS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.uS.getlist().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }
}
