import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { EventUser } from 'src/app/models/eventuser';
import { EventuserService } from 'src/app/services/eventuser.service';
import { UsermaterialService } from 'src/app/services/usermaterial.service';

@Component({
  selector: 'app-listar-eventuser',
  templateUrl: './listar-eventuser.component.html',
  styleUrls: ['./listar-eventuser.component.css'],
})
export class ListarEventuserComponent implements OnInit {
  dataSource: MatTableDataSource<EventUser> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = ['idEventUser', 'idUser', 'idEvent'];
  constructor(private uS: EventuserService) {}
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
