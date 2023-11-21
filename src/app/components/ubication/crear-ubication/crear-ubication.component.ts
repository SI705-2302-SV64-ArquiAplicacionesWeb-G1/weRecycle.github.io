import { UbicationService } from './../../../services/ubication.service';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  FormControl,
  } from '@angular/forms';
  import { ActivatedRoute, Params, Router } from '@angular/router';
import * as moment from 'moment';
import { Ubication } from 'src/app/models/ubication';


@Component({
  selector: 'app-crear-ubication',
  templateUrl: './crear-ubication.component.html',
  styleUrls: ['./crear-ubication.component.css']
})
export class CrearUbicationComponent implements OnInit{
  form: FormGroup = new FormGroup({});
ubication: Ubication = new Ubication();
mensaje: string = '';
maxFecha: Date = moment().add(-1, 'days').toDate();
id: number = 0;
edicion: boolean = false;
tipos: { value: string; viewValue: string }[] = [
{ value: 'departamento', viewValue: 'departamento' },
{ value: 'casa', viewValue: 'casa' },
];
constructor(
  private uS: UbicationService,
  private router: Router,
  private formBuilder: FormBuilder,
  private route: ActivatedRoute
  ) {}
  
  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();});

      
      this.form = this.formBuilder.group({
        idUbication: [''],
        ubicationDate: ['', Validators.required],
        addressUbication: ['', Validators.required],
        cityUbication: ['', [Validators.required]],
        contactUbication: ['', [Validators.required]],
        typeUbication: ['', Validators.required],
        descUbication: ['', Validators.required],
        });
        }
 
        aceptar(): void {
        if (this.form.valid) {
        this.ubication.idUbication = this.form.value.idUbication;
        this.ubication.ubicationDate = this.form.value.ubicationDate;
        this.ubication.addressUbication = this.form.value.addressUbication;
        this.ubication.cityUbication = this.form.value.cityUbication;
        this.ubication.contactUbication = this.form.value.contactUbication;
        this.ubication.typeUbication = this.form.value.typeUbication;
        this.ubication.descUbication = this.form.value.descUbication;
        if (this.edicion) {
        this.uS.update(this.ubication).subscribe(() => {
        this.uS.list().subscribe((data) => {
        this.uS.setList(data);
        });
        });
        } else {
        this.uS.insert(this.ubication).subscribe((data) => {
        this.uS.list().subscribe((data) => {
        this.uS.setList(data);
        });
        });
        }
        this.router.navigate(['ubications']);
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
        
        init() {
          if (this.edicion) {
            this.uS.listId(this.id).subscribe((data) => {
            this.form = new FormGroup({
              idUbication: new FormControl(data.idUbication),
              ubicationDate: new FormControl(data.ubicationDate),
              addressUbication: new FormControl(data.addressUbication),
              cityUbication:new FormControl(data.cityUbication),
              contactUbication: new FormControl(data.contactUbication),
              typeUbication: new FormControl(data.typeUbication),
              descUbication: new FormControl(data.descUbication),
            });
            });
            }
  }

}
