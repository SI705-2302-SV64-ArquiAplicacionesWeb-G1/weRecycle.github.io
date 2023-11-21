import { Component,OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Ubication } from 'src/app/models/ubication';
import { UbicationService } from 'src/app/services/ubication.service';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-listar-ubication',
  templateUrl: './listar-ubication.component.html',
  styleUrls: ['./listar-ubication.component.css']
})
export class ListarUbicationComponent implements OnInit {
  dataSource: MatTableDataSource<Ubication> = new MatTableDataSource();
@ViewChild(MatPaginator) paginator!: MatPaginator;
displayedColumns: string[] = [
'idUbication',
'addressUbication',
'ubicationDate',
'ciudad',
'contactUbication',
'accion02',
];
constructor(private uS: UbicationService) {}
ngOnInit(): void {
this.uS.list().subscribe((data) => {
this.dataSource = new MatTableDataSource(data);
this.dataSource.paginator = this.paginator;
});
this.uS.getList().subscribe((data) => {
this.dataSource = new MatTableDataSource(data);
this.dataSource.paginator = this.paginator;
});
}
eliminar(id: number) {
this.uS.delete(id).subscribe((data) => {
this.uS.list().subscribe((data) => {
this.uS.setList(data);
});
});
}
filter(en: any) {
this.dataSource.filter = en.target.value.trim();
}
}

