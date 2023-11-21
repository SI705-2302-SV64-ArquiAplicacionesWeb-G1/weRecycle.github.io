import { Component,OnInit,ViewChild } from '@angular/core';
import { Publication } from 'src/app/models/publication';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { PublicationService } from 'src/app/services/publication.service';


@Component({
  selector: 'app-listar-publication',
  templateUrl: './listar-publication.component.html',
  styleUrls: ['./listar-publication.component.css']
})
export class ListarPublicationComponent implements OnInit{

  dataSource: MatTableDataSource<Publication> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = [
    'codigo',
    'titulo',
    'description',
    'archivo',
    'fecha',
    'usuario',
    'tiporecurso',
  ];
  constructor(private uS: PublicationService) {}
  
  
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

  /*filter(en: any) {
    this.dataSource.filter = en.target.value.trim();
  }*/
  
 
}
