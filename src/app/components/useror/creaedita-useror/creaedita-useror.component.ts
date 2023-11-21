import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as moment from 'moment';
import { Roles } from 'src/app/models/roles';
import { Ubication } from 'src/app/models/ubication';
import { Useror } from 'src/app/models/useror';
import { RolesService } from 'src/app/services/roles.service';
import { TypeRecursoService } from 'src/app/services/type-recurso.service';
import { UbicationService } from 'src/app/services/ubication.service';
import { UserorService } from 'src/app/services/useror.service';

@Component({
  selector: 'app-creaedita-useror',
  templateUrl: './creaedita-useror.component.html',
  styleUrls: ['./creaedita-useror.component.css'],
})
export class CreaeditaUserorComponent implements OnInit {
  hide = true;
  form: FormGroup = new FormGroup({});
  useror: Useror = new Useror();
  mensaje: string = '';
  listaRoles: Roles[] = [];
  listaUbicaciones: Ubication[] = [];
  maxFecha: Date = moment().add(-1, 'days').toDate();
  id: number = 0;
  edicion: boolean = false;
  constructor(
    private uS: UserorService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });
    this.form = this.formBuilder.group({
      idUser: [''],
      userName: ['', Validators.required],
      userPassword: ['', Validators.required],
      userEmail: ['', Validators.required],
      userAge: ['', Validators.required],
    });
  }
  aceptar(): void {
    if (this.form.valid) {
      this.useror.idUser = this.form.value.idUser;
      this.useror.userName = this.form.value.userName;
      this.useror.userPassword = this.form.value.userPassword;
      this.useror.userEmail = this.form.value.userEmail;
      this.useror.userAge = this.form.value.userAge;
      if(this.edicion){
        this.uS.update(this.useror).subscribe(()=>{
          this.uS.list().subscribe((data)=>{
            this.uS.setlist(data);
          });
        });
      }else
      this.uS.insert(this.useror).subscribe((data) => {
        this.uS.list().subscribe((data) => {
          this.uS.setlist(data);
        });
      });

      this.router.navigate(['components/users']);
    } else {
      this.mensaje = 'Por Favor complete todos los campos obligatorios.';
    }
  }

  obtenerControlCampo(nombreCampo: string): AbstractControl {
    const control = this.form.get(nombreCampo);
    if (!control) {
      throw new Error(`Control no encontrado para el campo ${nombreCampo}`);
    }
    return control;
  }

  init() {
    if (this.edicion) {
      this.uS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          idUser: new FormControl(data.idUser),
          userName: new FormControl(data.userName),
          userPassword: new FormControl(data.userPassword),
          userEmail: new FormControl(data.userEmail),
          userAge: new FormControl(data.userAge),
        });
      });
    }
  }
}
