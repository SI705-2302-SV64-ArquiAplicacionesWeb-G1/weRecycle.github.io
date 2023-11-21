import { coerceElement } from '@angular/cdk/coercion';
import { Publication } from './../../../models/publication';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { from } from 'rxjs';
import { Comment } from 'src/app/models/commentts';
import { CommenttsService } from 'src/app/services/commentts.service';
import { PublicationService } from 'src/app/services/publication.service';

@Component({
  selector: 'app-creaedita-commentts',
  templateUrl: './creaedita-commentts.component.html',
  styleUrls: ['./creaedita-commentts.component.css'],
})
export class CreaeditaCommenttsComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  comment: Comment = new Comment();
  mensaje: string = '';
  listaPublicaciones: Publication[] =[];
  constructor(private uS: CommenttsService,
    private router : Router,
    private sS: PublicationService,
    private formBuilder:FormBuilder){}

    ngOnInit(): void {
        this.form = this.formBuilder.group({
          idComment : [''],
          idPublication:['', Validators.required],
          descriptions:['',Validators.required]
        })
        this.sS.list().subscribe((data)=>{
          this.listaPublicaciones = data;
        })
    }
    aceptar():void{
      if(this.form.valid){
        this.comment.idPublication.idPublication = this.form.value.idPublication;
        this.comment.description = this.form.value.descriptions;
        this.uS.insert(this.comment).subscribe((data)=>{
          this.uS.list().subscribe((data)=>{
            this.uS.setlist(data);
          });
        });
        this.router.navigate(['']);
      }else{
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
}
