import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { take } from 'rxjs';
import { Events } from 'src/app/models/events';
import { Useror } from 'src/app/models/useror';
import { EventsService } from 'src/app/services/events.service';
import { UserorService } from 'src/app/services/useror.service';

@Component({
  selector: 'app-listar-mis-eventos',
  templateUrl: './listar-mis-eventos.component.html',
  styleUrls: ['./listar-mis-eventos.component.css']
})
export class ListarMisEventosComponent implements OnInit {

  dataSource: Events[]=[];
    filteredData: Events[] = [];
      @ViewChild(MatPaginator) paginator!: MatPaginator;
      displayedColumns: string[] = [
        'nombre',
        'direccion',
        'fecha',
        'hora'
      ];


      constructor(private eS: EventsService,
        private userS:UserorService
        ) {}

        ngOnInit(): void {
          const currentUser = this.userS.getCurrentUser();

          if (currentUser) {
            // Llama al servicio para obtener los eventos del usuario
            this.eS.getEventsForUser(currentUser.idUser).pipe(take(1)).subscribe((data) => {
              // Ordena la lista por fecha en orden descendente
              this.dataSource = data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
              this.filteredData = this.dataSource;
            });
          } else {
            console.error('Usuario actual no encontrado');
          }


          this.eS.getList().subscribe((data=>{
            this.dataSource=  data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
          }))
        }
        
  
  
      filter(en: any) {
        const filterValue = en.target.value.toLowerCase();
        this.filteredData = this.dataSource.filter((item) =>
          item.title.toLowerCase().includes(filterValue)
        );
      } 


      eliminar(id:number){
        this.eS.delete(id).subscribe((data)=>{
          this.eS.list().subscribe((data)=>{
            this.eS.setList(data);
          });
        });
      }
}
