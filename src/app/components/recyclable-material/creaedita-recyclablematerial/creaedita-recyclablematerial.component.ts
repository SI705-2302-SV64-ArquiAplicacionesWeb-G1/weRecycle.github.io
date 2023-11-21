import { RecyclableMaterial } from '../../../models/recyclable-material';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RecyclableMaterialService } from 'src/app/services/recyclable-material.service';

@Component({
  selector: 'app-creaedita-recyclablematerial',
  templateUrl: './creaedita-recyclablematerial.component.html',
  styleUrls: ['./creaedita-recyclablematerial.component.css'],
})
export class CreaeditaRecyclablematerialComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  recyclablematerial: RecyclableMaterial = new RecyclableMaterial();
  mensaje: string = '';
  constructor(
    private uS: RecyclableMaterialService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      idRecyclableMaterial: [''],
      nameRecyclableMaterial: ['', Validators.required],
      descriptionRecyclableMaterial: ['', Validators.required],
      typeRecyclableMaterial: ['', Validators.required],
      costMaterial:['',Validators.required],
    });
  }
  aceptar(): void {
    if (this.form.valid) {
      this.recyclablematerial.nameRecyclableMaterial =
        this.form.value.nameRecyclableMaterial;
      this.recyclablematerial.descriptionRecyclableMaterial =
        this.form.value.descriptionRecyclableMaterial;
      this.recyclablematerial.typeRecyclableMaterial =
        this.form.value.typeRecyclableMaterial;
      this.recyclablematerial.costMaterial = this.form.value.costMaterial;
      this.uS.insert(this.recyclablematerial).subscribe((data) => {
        this.uS.list().subscribe((data) => {
          this.uS.setlist(data);
        });
      });
      this.router.navigate(['RecyclableMaterialController']);
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
