import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  AbstractControl,
} from '@angular/forms';
import { Roles } from 'src/app/models/roles';
import { RolesService } from 'src/app/services/roles.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Useror } from 'src/app/models/useror';
import { UserorService } from 'src/app/services/useror.service';
@Component({
  selector: 'app-creaedita-roles',
  templateUrl: './creaedita-roles.component.html',
  styleUrls: ['./creaedita-roles.component.css']
})
export class CreaeditaRolesComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  roles: Roles = new Roles();
  mensaje :string ='';
  typeUser: {value : string ; viewValue:string}[]= [
    {value: 'ADMIN', viewValue: 'ADMIN'},
    {value: 'WEB', viewValue : 'WEB'}
  ];
  listaUsuarios: Useror[]= [];
  constructor(private uS : RolesService,
    private router: Router,
    private sS: UserorService,
    private formBuilder: FormBuilder,
    private route : ActivatedRoute){}

    ngOnInit(): void {
        this.form = this.formBuilder.group({
          idTypeUser:[''],
          typeAccount:['',Validators.required],
          stateType:['',Validators.required],
          useror:['',Validators.required]
        })
        this.sS.list().subscribe((data)=>{
          this.listaUsuarios =data;
        })
    }
    aceptar(): void {
      if (this.form.valid) {
        this.roles.typeAccount = this.form.value.typeAccount;
        this.roles.stateType = this.form.value.stateType;
        this.roles.useror.idUser = this.form.value.useror;
        this.uS.insert(this.roles).subscribe((data) => {
          this.uS.list().subscribe((data) => {
            this.uS.setlist(data);
          });
        });
        this.router.navigate(['typeusers']);
      } else {
        this.mensaje = 'Por favor complete todos los campos obligatorios.';
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
