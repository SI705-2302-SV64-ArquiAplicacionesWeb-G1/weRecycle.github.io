import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Roles } from 'src/app/models/roles';
import { RolesService } from 'src/app/services/roles.service';

@Component({
  selector: 'app-lista-roles',
  templateUrl: './lista-roles.component.html',
  styleUrls: ['./lista-roles.component.css']
})
export class ListaRolesComponent implements OnInit{
  dataSource: MatTableDataSource<Roles> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  displayedColumns: string[] =[
    'idTypeUser',
    'typeAccount',
    'stateType',
    'useror',
    'accion02'
  ];
  constructor(private rS: RolesService){}
  ngOnInit(): void {
      this.rS.list().subscribe((data)=>{
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
      });
      this.rS.getlist().subscribe((data)=>{
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
      });
  }
  eliminar(id:number){
    this.rS.delete(id).subscribe((data)=>{
      this.rS.list().subscribe((data)=>{
        this.rS.setlist(data);
      });
    });
  }
}
