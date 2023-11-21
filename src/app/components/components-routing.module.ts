import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecyclableMaterialComponent } from './recyclable-material/recyclable-material.component';
import { CreaeditaRecyclablematerialComponent } from './recyclable-material/creaedita-recyclablematerial/creaedita-recyclablematerial.component';
import { ListarRecyclablematerialComponent } from './recyclable-material/listar-recyclablematerial/listar-recyclablematerial.component';
import { FrequenquestionsComponent } from './frequenquestions/frequenquestions.component';
import { CreaeditaFrequenquestionsComponent } from './frequenquestions/creaedita-frequenquestions/creaedita-frequenquestions.component';
import { CrearUbicationComponent } from './ubication/crear-ubication/crear-ubication.component';
import { UbicationComponent } from './ubication/ubication.component';
import { UserorComponent } from './useror/useror.component';
import { CreaeditaUserorComponent } from './useror/creaedita-useror/creaedita-useror.component';
import { ListaUserorComponent } from './useror/lista-useror/lista-useror.component';
import { RolesComponent } from './roles/roles.component';
import { CreaeditaRolesComponent } from './roles/creaedita-roles/creaedita-roles.component';
import { ListaRolesComponent } from './roles/lista-roles/lista-roles.component';
import { CrearRecyclingCenterComponent } from './recycling-center/crear-recycling-center/crear-recycling-center.component';
import { RecyclingCenterComponent } from './recycling-center/recycling-center.component';
import { EventsComponent } from './events/events.component';
import { CrearEventComponent } from './events/crear-event/crear-event.component';
import { PublicationComponent } from './publication/publication.component';
import { CreaeditaPublicationComponent } from './publication/creaedita-publication/creaedita-publication.component';
import { TypeRecursoComponent } from './type-recurso/type-recurso.component';
import { CreaeditaTiporecursoComponent } from './type-recurso/creaedita-tiporecurso/creaedita-tiporecurso.component';
import { ListarMiCentroComponent } from './recycling-center/listar-mi-centro/listar-mi-centro.component';
import { ListarMisEventosComponent } from './events/listar-mis-eventos/listar-mis-eventos.component';

import { Comment } from '../models/commentts';
import { ListarCommenttsComponent } from './commentts/listar-commentts/listar-commentts.component';
import { CreaeditaCommenttsComponent } from './commentts/creaedita-commentts/creaedita-commentts.component';
import { CommenttsComponent } from './commentts/commentts.component';
import { LikeComponent } from './like/like.component';
import { ListarLikeComponent } from './like/listar-like/listar-like.component';
import { CreaeditaLikeComponent } from './like/creaedita-like/creaedita-like.component';
import { UsermaterialComponent } from './usermaterial/usermaterial.component';
import { ListarUsermaterialComponent } from './usermaterial/listar-usermaterial/listar-usermaterial.component';
import { CreaeditaUsermaterialComponent } from './usermaterial/creaedita-usermaterial/creaedita-usermaterial.component';
import { ListarEventComponent } from './events/listar-event/listar-event.component';
import { CreaeditaEventuserComponent } from './eventuser/creaedita-eventuser/creaedita-eventuser.component';
import { UsuariosRegistradosComponent } from './reportes/usuarios-registrados/usuarios-registrados.component';
import { ListarPublicationComponent } from './publication/listar-publication/listar-publication.component';
import { ListarPiblicationIdComponent } from './publication/listar-piblication-id/listar-piblication-id.component';
import { EventuserComponent } from './eventuser/eventuser.component';
import { ListarEventuserComponent } from './eventuser/listar-eventuser/listar-eventuser.component';

import { PublicacionPorTipoComponent } from './reportes/publicacion-por-tipo/publicacion-por-tipo.component';

import { CantidaDeLikesPorPublicacionReporteComponent } from './reportes/cantida-de-likes-por-publicacion-reporte/cantida-de-likes-por-publicacion-reporte.component';

import { CantidadComentariosPorPublicacionComponent } from './reportes/cantidad-comentarios-por-publicacion/cantidad-comentarios-por-publicacion.component';
import { CantidadEventosPorUbicacionComponent } from './reportes/cantidad-eventos-por-ubicacion/cantidad-eventos-por-ubicacion.component';



const routes: Routes = [
  {
    path: 'RecyclableMaterialController',
    component: RecyclableMaterialComponent,
    children: [
      {
        path: 'nuevo',
        component: CreaeditaRecyclablematerialComponent,
      },
      {
        path: 'lista',
        component: ListarRecyclablematerialComponent,
      },
    ],
  },
  {
    path: 'frequentquestioncontroller',
    component: FrequenquestionsComponent,
    children: [
      { path: 'nuevo', component: CreaeditaFrequenquestionsComponent },
    ],
  },
  {
    path: 'ubications',
    component: UbicationComponent,
    children: [{ path: 'mapa', component: CrearUbicationComponent }],
  },
  {
    path: 'users',
    component: UserorComponent,
    children: [
      { path: 'user', component: CreaeditaUserorComponent },
      { path: 'lista', component: ListaUserorComponent },
    ],
  },
  {
    path: 'typeusers',
    component: RolesComponent,
    children: [
      {
        path: 'rol',
        component: CreaeditaRolesComponent,
      },
      {
        path: 'lista',
        component: ListaRolesComponent,
      },
    ],
  },

  {
    path: 'center-recycling',
    component: RecyclingCenterComponent,
    children: [
      { path: 'nuevo', component: CrearRecyclingCenterComponent },
      { path: 'mi-centro', component: ListarMiCentroComponent },
      { path: 'mi-centro/:id', component: CrearRecyclingCenterComponent },
    ],
  },

  {
    path: 'event',
    component: EventsComponent,
    children: [
      { path: 'nuevo', component: CrearEventComponent },
      { path: 'mis-eventos/:id', component: CrearEventComponent },
      { path: 'mis-eventos', component: ListarMisEventosComponent },
    ],
  },

  {
    path: 'PublicationController',
    component: PublicationComponent,
    children: [{ path: 'nuevo', component: CreaeditaPublicationComponent }],
  },

  {
    path: 'TypeRecursoController',
    component: TypeRecursoComponent,
    children: [{ path: 'nuevo', component: CreaeditaTiporecursoComponent }],
  },
  {
    path: 'comments',
    component: CommenttsComponent,
    children: [
      { path: 'nuevo', component: ListarCommenttsComponent },

      { path: 'crear', component: CreaeditaCommenttsComponent },
    ],
  },

  {
    path: 'likes',
    component: LikeComponent,
    children: [
      { path: 'nuevo', component: ListarLikeComponent },

      { path: 'crear', component: CreaeditaCommenttsComponent },
    ],
  },
  {
    path: 'eventsusercontroller',
    component: EventuserComponent,
    children: [
      { path: 'nuevo', component: ListarEventuserComponent },

      { path: 'crear', component: CreaeditaEventuserComponent },
    ],
  },
  {
    path: 'MaterialUserControllet',
    component: UsermaterialComponent,
    children: [
      { path: 'nuevo', component: ListarUsermaterialComponent },

      { path: 'crear', component: CreaeditaUsermaterialComponent },
    ],
  },
{
  path: 'PublicationController',
  component: PublicationComponent,
  children: [
    { path: 'nuevo', component: CreaeditaPublicationComponent },
    { path: 'ediciones/:id', component: CreaeditaPublicationComponent },
    { path: 'publicacion/:id', component: ListarPiblicationIdComponent},

  ],
},
{
  path:'cantidadPorTipo',
  component: PublicacionPorTipoComponent,
},

{
  path: 'TypeRecursoController',
  component: TypeRecursoComponent,
  children: [
    { path: 'nuevo', component: CreaeditaTiporecursoComponent },
  ],
},

{
  path: 'cantidad-usuarios',
  component: UsuariosRegistradosComponent,
},
{
  path: 'cantidad-likes-por-publicacion',
  component: CantidaDeLikesPorPublicacionReporteComponent,
},
{
  path: 'cantidad-comentarios',
  component: CantidadComentariosPorPublicacionComponent,
},

{
  path: 'cantidad-eventos-por-ubicacion',
  component: CantidadEventosPorUbicacionComponent,
}

  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComponentsRoutingModule {}
