import { LikeService } from 'src/app/services/like.service';

import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Publication } from 'src/app/models/publication';
import * as moment from 'moment';
import { Useror } from 'src/app/models/useror';
import { TypeRecurso } from 'src/app/models/typerecurso';
import { PublicationService } from 'src/app/services/publication.service';
import { UserorService } from 'src/app/services/useror.service';
import { TypeRecursoService } from 'src/app/services/type-recurso.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { Comment } from 'src/app/models/commentts';
import { CommenttsService } from 'src/app/services/commentts.service';
import { Like } from 'src/app/models/like';

@Component({
  selector: 'app-listar-piblication-id',
  templateUrl: './listar-piblication-id.component.html',
  styleUrls: ['./listar-piblication-id.component.css'],
})
export class ListarPiblicationIdComponent implements OnInit {
  coment: Comment = new Comment();
  dataSourcecoment: MatTableDataSource<Comment[]> = new MatTableDataSource();
  dataSource: MatTableDataSource<Publication> = new MatTableDataSource();
  publicacion: Publication = new Publication();
  mensaje: string = '';
  id: number = 0;
  form: FormGroup = new FormGroup({});
  formlike: FormGroup = new FormGroup({});
  like: Like = new Like();
  cantidadLikes: number = 1;


  idPublication: number = 0;
  title: string = '';
  description: string = '';
  archivo: string = '';
  datePublication: Date = new Date();
  id_TypeRecurso: TypeRecurso = new TypeRecurso();
  idUser: Useror = new Useror();  
prueba:number  

  listaUsuarios: Useror[] = [];
  listaTiporecurso: TypeRecurso[] = [];
  listacomentarios: Comment[] = [];
  constructor(
    private pS: PublicationService,
    private uS: UserorService,
    private tS: TypeRecursoService,
    private cS: CommenttsService,
    private route: ActivatedRoute,
    private formBuilder:FormBuilder,
    private router : Router,
    private lS: LikeService,
   private formBuilder2:FormBuilder
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.init();
    });
    this.formlike = this.formBuilder2.group({
      idLike: [''],
      idPublication: [this.id, Validators.required],
    })
    this.lS.cantidadlikes(this.id).subscribe((response) => {
      // Asegúrate de que response sea un array y tenga al menos un elemento
      if (Array.isArray(response) && response.length > 0) {
        this.cantidadLikes = response[0].QuantityOfLikes;
        console.log('Cantidad de Likes:', this.cantidadLikes);
      } else {
        console.error('La respuesta no tiene el formato esperado:', response);
      }
    });
    
    
    
       this.uS.list().subscribe((data) => {
      this.listaUsuarios = data;
    });

    this.tS.list().subscribe((data) => {
      this.listaTiporecurso = data;
    });
    this.cS.listIdP(this.id).subscribe(
      (data) => {
        console.log("Ejecutado correctamente");
        this.listacomentarios = data;
        console.log(this.listacomentarios);
       this.dataSourcecoment = new MatTableDataSource([data]);
      },
      (error) => {
        console.error("Error en la solicitud:", error);
      }
    );
    this.pS.listId(this.id).subscribe((data) => {
      this.dataSource = new MatTableDataSource([data]);
    
    });
     this.form = this.formBuilder.group({
          idComment : [''],
          idPublication:[this.id, Validators.required],
          descriptions:['',Validators.required]
        })



  }
  aceptar():void{
    if(this.form.valid){
      this.coment.idPublication.idPublication =this.form.value.idPublication;
      this.coment.description = this.form.value.descriptions;
      this.cS.insert(this.coment).subscribe((data)=>{
        this.cS.list().subscribe((data)=>{
          this.cS.setlist(data);
        });
      });
      this.router.navigate(['publicacion']);
    }else{
      this.mensaje = 'Por Favor complete todos los campos obligatorios.';
    }
  }

  aceptar2(): void {
    if (this.formlike.valid) {
      this.like.idPublication.idPublication = this.formlike.value.idPublication;

      this.lS.insert(this.like).subscribe((data)=>{
        this.lS.list().subscribe((data)=>{
          this.lS.setlist(data);
          
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
  init() {
    // No es necesario realizar acciones de inicialización en este caso
  }
}
