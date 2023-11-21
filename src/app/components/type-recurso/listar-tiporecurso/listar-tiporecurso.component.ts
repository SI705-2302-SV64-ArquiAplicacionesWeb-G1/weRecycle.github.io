import { Component, OnInit,ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { TypeRecurso } from 'src/app/models/typerecurso';
import { TypeRecursoService } from 'src/app/services/type-recurso.service';

@Component({
  selector: 'app-listar-tiporecurso',
  templateUrl: './listar-tiporecurso.component.html',
  styleUrls: ['./listar-tiporecurso.component.css']
})
export class ListarTiporecursoComponent implements OnInit {

  dataSource: MatTableDataSource<TypeRecurso> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = [
    'codigo',
    'recurso',
  ];
  constructor(private tS: TypeRecursoService) {}
  ngOnInit(): void {
    this.tS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.tS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;

    });
  }
}
