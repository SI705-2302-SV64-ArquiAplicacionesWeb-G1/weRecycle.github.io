import { shareReplay, map } from 'rxjs/operators';
import { Observable} from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { RecyclableMaterial } from 'src/app/models/recyclable-material';
import { RecyclableMaterialService } from 'src/app/services/recyclable-material.service';

@Component({
  selector: 'app-listar-recyclablematerial',
  templateUrl: './listar-recyclablematerial.component.html',
  styleUrls: ['./listar-recyclablematerial.component.css'],
})
export class ListarRecyclablematerialComponent implements OnInit {
  private breakpointObserver = Inject(BreakpointObserver);

  /*isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );*/
  dataSource: MatTableDataSource<RecyclableMaterial> = new MatTableDataSource();
  datasource:RecyclableMaterial[]=[]
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  filteredData: RecyclableMaterial[]=[];
  displayedColumns: string[] = [
    'idRecyclableMaterial',
    'nameRecyclableMaterial',
    'descriptionRecyclableMaterial',
    'typeRecyclableMaterial',
  ];
  constructor(private uS: RecyclableMaterialService) {}
  ngOnInit(): void {
    this.uS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.datasource = data;
      this.filteredData = this.datasource;
    });
    this.uS.getlist().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }
  filter(en: any){
    const filterValue = en.target.value.toLowerCase();
    this.filteredData = this.datasource.filter((item)=> item.nameRecyclableMaterial.toLowerCase().includes(filterValue))
  }
}
