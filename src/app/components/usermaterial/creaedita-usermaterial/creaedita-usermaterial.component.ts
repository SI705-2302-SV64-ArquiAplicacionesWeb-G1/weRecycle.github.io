import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { RecyclableMaterial } from 'src/app/models/recyclable-material';
import { UserMaterial } from 'src/app/models/usermaterial';
import { Useror } from 'src/app/models/useror';
import { RecyclableMaterialService } from 'src/app/services/recyclable-material.service';
import { UsermaterialService } from 'src/app/services/usermaterial.service';
import { UserorService } from 'src/app/services/useror.service';

@Component({
  selector: 'app-creaedita-usermaterial',
  templateUrl: './creaedita-usermaterial.component.html',
  styleUrls: ['./creaedita-usermaterial.component.css'],
})
export class CreaeditaUsermaterialComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  usermaterial: UserMaterial = new UserMaterial();
  mensaje: string = '';
  listaUsuario: Useror[] = [];
  listaMateriales: RecyclableMaterial[] = [];
  constructor(
    private uS: UsermaterialService,
    private router: Router,
    private sS: UserorService,
    private rS: RecyclableMaterialService,
    private formBuilder: FormBuilder
  ) {}
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      idMaterialUser: [''],
      idRecyclableMaterial: ['', Validators.required],
      idUser: ['', Validators.required],
    });
    
    this.rS.list().subscribe((data) => {
       console.log('que fue');
      this.listaMateriales = data;
     
    });
    this.sS.list().subscribe((data) => {
      this.listaUsuario = data;
      console.log('quue');
      console.log('acaaa', this.listaMateriales);
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.usermaterial.idRecyclableMaterial.idRecyclableMaterial =
        this.form.value.idRecyclableMaterial;
      this.usermaterial.idUser.idUser = this.form.value.idUser;
      this.uS.insert(this.usermaterial).subscribe((data) => {
        this.uS.list().subscribe((data) => {
          this.uS.setlist(data);
        });
      });
    } else {
      this.mensaje = 'porfavor complete todos los cambios';
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
