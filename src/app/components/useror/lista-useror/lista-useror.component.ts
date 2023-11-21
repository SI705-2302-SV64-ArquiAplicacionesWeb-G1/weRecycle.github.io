import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Useror } from 'src/app/models/useror';
import { UserorService } from 'src/app/services/useror.service';

@Component({
  selector: 'app-lista-useror',
  templateUrl: './lista-useror.component.html',
  styleUrls: ['./lista-useror.component.css']
})
export class ListaUserorComponent implements OnInit{
  dataSource: MatTableDataSource<Useror> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns:string[]=[
    'idUser',
    'userName',
    'userPassword',
    'userEmail',
    'userAge',
    'accion02'
  ];
  constructor(private uS: UserorService){}
  ngOnInit(): void {
    console.log("ngOnInit se está ejecutando.");

      this.uS.list().subscribe((data)=>{

        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        console.log("Datos recibidos del servicio:", data);

      });
      this.uS.getlist().subscribe((data)=>{
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
      })
  }
  eliminar(id:number){
    this.uS.delete(id).subscribe((data)=>{
      this.uS.list().subscribe((data)=>{
        this.uS.setlist(data);
      })
    })
  }

  
}
