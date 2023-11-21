import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Like } from 'src/app/models/like';
import { Publication } from 'src/app/models/publication';
import { LikeService } from 'src/app/services/like.service';
import { PublicationService } from 'src/app/services/publication.service';

@Component({
  selector: 'app-creaedita-like',
  templateUrl: './creaedita-like.component.html',
  styleUrls: ['./creaedita-like.component.css'],
})
export class CreaeditaLikeComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  like: Like = new Like();
  mensaje: String = '';
  listaPublicaciones: Publication[] =[];
  constructor(
    private uS: LikeService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
        private sS: PublicationService,

  ) {}
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      idLike: [''],
      idPublication: ['', Validators.required],
    })
    this.sS.list().subscribe((data)=>{
      this.listaPublicaciones = data;
    })
  }
  aceptar(): void {
    if (this.form.valid) {
      this.like.idPublication.idPublication = this.form.value.idPublication;

      this.uS.insert(this.like).subscribe((data)=>{
        this.uS.list().subscribe((data)=>{
          this.uS.setlist(data);
        });
      });
      this.router.navigate(['likes']);
    } else {
      this.mensaje = 'por favor complete todo los campos obligatorios';
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
