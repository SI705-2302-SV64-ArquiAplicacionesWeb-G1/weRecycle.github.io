import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Events } from 'src/app/models/events';
import { EventUser } from 'src/app/models/eventuser';
import { Useror } from 'src/app/models/useror';
import { EventsService } from 'src/app/services/events.service';
import { EventuserService } from 'src/app/services/eventuser.service';
import { UserorService } from 'src/app/services/useror.service';

@Component({
  selector: 'app-creaedita-eventuser',
  templateUrl: './creaedita-eventuser.component.html',
  styleUrls: ['./creaedita-eventuser.component.css'],
})
export class CreaeditaEventuserComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  eventuser: EventUser = new EventUser();
  mensaje: string = '';
  listaEvent: Events[] = [];
  listaUsuario: Useror[] = [];
  constructor(
    private uS: EventuserService,
    private router: Router,
    private sS: UserorService,
    private eS: EventsService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      idEventUser: [''],
      idUser: ['', Validators.required],
      idEvent: ['', Validators.required],
    });
    this.sS.list().subscribe((data) => {
      this.listaUsuario = data;
    });
    this.eS.list().subscribe((data) => {
      this.listaEvent = data;
    });
  }
  aceptar(): void {
    if (this.form.valid) {
      this.eventuser.idEvent.idEvent=this.form.value.idEvent;
      this.eventuser.idUser.idUser=this.form.value.idUser;
      this.uS.insert(this.eventuser).subscribe((data) => {
        this.uS.list().subscribe((data) => {
          this.uS.setlist(data);
        });
      });
    }else{
      this.mensaje='porfa ingresa datos correstos';
    }
  }

  
  obtenerControlCampo(nombreCampo: string): AbstractControl {
    const control = this.form.get(nombreCampo);
    if (!control) {
      throw new Error(`Control no encontrado para el campo ${nombreCampo}`);
    }
    return control;
  }
}
