import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { TypeRecurso } from 'src/app/models/typerecurso';
import { TypeRecursoService } from 'src/app/services/type-recurso.service';

@Component({
  selector: 'app-creaedita-tiporecurso',
  templateUrl: './creaedita-tiporecurso.component.html',
  styleUrls: ['./creaedita-tiporecurso.component.css']
})
export class CreaeditaTiporecursoComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  tipoRecurso: TypeRecurso = new TypeRecurso();
  mensaje: string = '';
  maxFecha: Date = moment().add(-1, 'days').toDate();
  /*tipos: { value: string; viewValue: string }[] = [
    { value: 'Pública', viewValue: 'Pública' },
    { value: 'Privada', viewValue: 'Privada' },
  ];*/

  constructor(
    private tS: TypeRecursoService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      idTypeRecurso: [''],
      typeRecursotype: ['', Validators.required],
  
    });
  }
  aceptar(): void {
    if (this.form.valid) {
      this.tipoRecurso.idTypeRecurso = this.form.value.idTypeRecurso;
      this.tipoRecurso.typeRecursotype = this.form.value.typeRecursotype;
  

      this.tS.insert(this.tipoRecurso).subscribe((data) => {
        this.tS.list().subscribe((data) => {
          this.tS.setList(data);
        });
      });
      this.router.navigate(['TypeRecursoController']);
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


