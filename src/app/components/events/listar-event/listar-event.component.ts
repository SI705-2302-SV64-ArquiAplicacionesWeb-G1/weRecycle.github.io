import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatPaginator } from '@angular/material/paginator';
import { EventsService } from 'src/app/services/events.service';
import { Events } from 'src/app/models/events';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map, switchMap, take } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-listar-event',
  templateUrl: './listar-event.component.html',
  styleUrls: ['./listar-event.component.css']
})
export class ListarEventComponent implements OnInit {

  private breakpointObserver = inject(BreakpointObserver);
  eventSelected: any;
  vacantesLibres: boolean = true;
  dateControl = new FormControl(new Date());
  miFormulario: FormGroup;
  userFollowed:boolean=false;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
    );

  dataSource: Events[] = [];
  filteredData: Events[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = [
    'nombre',
    'direccion',
    'fecha',
    'hora'
  ];

  constructor(private eS: EventsService, private formBuilder: FormBuilder) {
    this.miFormulario = this.formBuilder.group({
      date: this.dateControl
    });
  }

  ngOnInit(): void {
    this.eS.list().pipe(take(1)).subscribe((data) => {
      this.dataSource = data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      this.filteredData = this.dataSource;

      if (this.dataSource.length > 0) {
        this.selectEvent(this.dataSource[0]);
      }
    });

    this.dateControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((fecha: Date | null) => {
        if (fecha) {
          const formattedDate = `${fecha.getFullYear()}-${('0' + (fecha.getMonth() + 1)).slice(-2)}-${('0' + fecha.getDate()).slice(-2)}`;
          const fechaF= formattedDate.toString();
          return this.eS.findByDate(fechaF);
        } else {
          return of([]);
        }
      })
    ).subscribe((data) => {
      this.dataSource = data;
      this.filteredData = this.dataSource;
    });
    
    
    
  }

  filter(en: any) {
    const filterValue = en.target.value.toLowerCase();
    this.filteredData = this.dataSource.filter((item) =>
      item.title.toLowerCase().includes(filterValue)
    );
  }

  selectEvent(event: any) {
    this.eventSelected = event;
  }

  seguirEvento() {
    if (!this.userFollowed) {
      // Seguir el evento
      this.eventSelected.numberParticipant--;
      this.userFollowed = true;
    } else {
      // Dejar de seguir el evento
      this.eventSelected.numberParticipant++;
      this.userFollowed = false;
    }
  
    // Llamada al nuevo método del servicio para actualizar solo el número de participantes
    this.eS.update(this.eventSelected).subscribe(
      () => {
        // Lógica adicional si es necesario
      },
      (error) => {
        console.error('Error al actualizar el evento', error);
      }
    );}

    
}
