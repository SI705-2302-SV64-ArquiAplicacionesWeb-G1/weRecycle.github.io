import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UserMaterial } from 'src/app/models/usermaterial';
import { UsermaterialService } from 'src/app/services/usermaterial.service';

@Component({
  selector: 'app-listar-usermaterial',
  templateUrl: './listar-usermaterial.component.html',
  styleUrls: ['./listar-usermaterial.component.css'],
})
export class ListarUsermaterialComponent implements OnInit {
  dataSource: MatTableDataSource<UserMaterial> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = [
    'idMaterialUse',
    'idRecyclableMaterial',
    'idUser',
  ];
  constructor(private uS: UsermaterialService) {}
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
