import { Component,OnInit,ViewChild} from '@angular/core';
import { FrequenQuestions } from 'src/app/models/frequenQuestions';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { FrequenQuestionsService } from 'src/app/services/frequen-questions.service';

@Component({
  selector: 'app-listar-frequenquestions',
  templateUrl: './listar-frequenquestions.component.html',
  styleUrls: ['./listar-frequenquestions.component.css']
})
export class ListarFrequenquestionsComponent implements OnInit{

  dataSource: MatTableDataSource<FrequenQuestions> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = [
    'codigo',
    'pregunta',
    'respuesta',
    'categoria',
    'dificultad',
    'fecha',
    'estado',
  ];
  constructor(private uS: FrequenQuestionsService) {}
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
}
