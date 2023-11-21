import { GoogleMapsModule } from '@angular/google-maps';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentsRoutingModule } from './components-routing.module';
import { LoginComponent } from './login/login.component';
import { UbicationComponent } from './ubication/ubication.component';
import { CrearUbicationComponent } from './ubication/crear-ubication/crear-ubication.component';
import { ListarUbicationComponent } from './ubication/listar-ubication/listar-ubication.component';
import { RolesComponent } from './roles/roles.component';
import { UserorComponent } from './useror/useror.component';
import { RecyclableMaterialComponent } from './recyclable-material/recyclable-material.component';
import { CreaeditaRecyclablematerialComponent } from './recyclable-material/creaedita-recyclablematerial/creaedita-recyclablematerial.component';
import { FrequenquestionsComponent } from './frequenquestions/frequenquestions.component';
import { ListarFrequenquestionsComponent } from './frequenquestions/listar-frequenquestions/listar-frequenquestions.component';
import { CreaeditaFrequenquestionsComponent } from './frequenquestions/creaedita-frequenquestions/creaedita-frequenquestions.component';
import { CreaeditaUserorComponent } from './useror/creaedita-useror/creaedita-useror.component';
import { CreaeditaRolesComponent } from './roles/creaedita-roles/creaedita-roles.component';
import { ListarRecyclablematerialComponent } from './recyclable-material/listar-recyclablematerial/listar-recyclablematerial.component';
import { ListaRolesComponent } from './roles/lista-roles/lista-roles.component';
import { ListaUserorComponent } from './useror/lista-useror/lista-useror.component';
import { MapaSidenavComponent } from './mapa-sidenav/mapa-sidenav.component';
import { RecyclingCenterComponent } from './recycling-center/recycling-center.component';
import { ListarRecyclingCenterComponent } from './recycling-center/listar-recycling-center/listar-recycling-center.component';
import { CrearRecyclingCenterComponent } from './recycling-center/crear-recycling-center/crear-recycling-center.component';
import { EventsComponent } from './events/events.component';
import { CrearEventComponent } from './events/crear-event/crear-event.component';
import { ListarEventComponent } from './events/listar-event/listar-event.component';
import { PublicationComponent } from './publication/publication.component';
import { ListarPublicationComponent } from './publication/listar-publication/listar-publication.component';
import { CreaeditaPublicationComponent } from './publication/creaedita-publication/creaedita-publication.component';
import { TypeRecursoComponent } from './type-recurso/type-recurso.component';
import { ListarTiporecursoComponent } from './type-recurso/listar-tiporecurso/listar-tiporecurso.component';
import { CreaeditaTiporecursoComponent } from './type-recurso/creaedita-tiporecurso/creaedita-tiporecurso.component';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ListarMisEventosComponent } from './events/listar-mis-eventos/listar-mis-eventos.component';
import { ListarMiCentroComponent } from './recycling-center/listar-mi-centro/listar-mi-centro.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

import { CommenttsComponent } from './commentts/commentts.component';
import { CreaeditaCommenttsComponent } from './commentts/creaedita-commentts/creaedita-commentts.component';
import { ListarCommenttsComponent } from './commentts/listar-commentts/listar-commentts.component';
import { LikeComponent } from './like/like.component';
import { CreaeditaLikeComponent } from './like/creaedita-like/creaedita-like.component';
import { ListarLikeComponent } from './like/listar-like/listar-like.component';
import { UsermaterialComponent } from './usermaterial/usermaterial.component';
import { CreaeditaUsermaterialComponent } from './usermaterial/creaedita-usermaterial/creaedita-usermaterial.component';
import { ListarUsermaterialComponent } from './usermaterial/listar-usermaterial/listar-usermaterial.component';
import { EventuserComponent } from './eventuser/eventuser.component';
import { CreaeditaEventuserComponent } from './eventuser/creaedita-eventuser/creaedita-eventuser.component';
import { ListarEventuserComponent } from './eventuser/listar-eventuser/listar-eventuser.component';

import { UsuariosRegistradosComponent } from './reportes/usuarios-registrados/usuarios-registrados.component';
import { NgChartsModule } from 'ng2-charts';
import { ListarPiblicationIdComponent } from './publication/listar-piblication-id/listar-piblication-id.component';
import { PublicacionPorTipoComponent } from './reportes/publicacion-por-tipo/publicacion-por-tipo.component';

import { CantidaDeLikesPorPublicacionReporteComponent } from './reportes/cantida-de-likes-por-publicacion-reporte/cantida-de-likes-por-publicacion-reporte.component';
import { CantidadComentariosPorPublicacionComponent } from './reportes/cantidad-comentarios-por-publicacion/cantidad-comentarios-por-publicacion.component';
import { CantidadEventosPorUbicacionComponent } from './reportes/cantidad-eventos-por-ubicacion/cantidad-eventos-por-ubicacion.component';


@NgModule({
  declarations: [
    
    UbicationComponent,
    CrearUbicationComponent,
    ListarUbicationComponent,
    RolesComponent,
    UserorComponent,
    RecyclableMaterialComponent,
    CreaeditaRecyclablematerialComponent,
    FrequenquestionsComponent,
    ListarFrequenquestionsComponent,
    CreaeditaFrequenquestionsComponent,
    CreaeditaUserorComponent,
    CreaeditaRolesComponent,
    ListarRecyclablematerialComponent,
    ListaRolesComponent,
    ListaUserorComponent,
    MapaSidenavComponent,
    RecyclingCenterComponent,
    ListarRecyclingCenterComponent,
    CrearRecyclingCenterComponent,
    EventsComponent,
    CrearEventComponent,
    ListarEventComponent,
    PublicationComponent,
    ListarPublicationComponent,
    CreaeditaPublicationComponent,
    TypeRecursoComponent,
    ListarTiporecursoComponent,
    CreaeditaTiporecursoComponent,
    ListarMisEventosComponent,
    ListarMiCentroComponent,

    CommenttsComponent,
    CreaeditaCommenttsComponent,
    ListarCommenttsComponent,
    LikeComponent,
    CreaeditaLikeComponent,
    ListarLikeComponent,
    UsermaterialComponent,
    CreaeditaUsermaterialComponent,
    ListarUsermaterialComponent,
    EventuserComponent,
    CreaeditaEventuserComponent,
    ListarEventuserComponent,
    UsuariosRegistradosComponent,
    ListarPiblicationIdComponent,

    PublicacionPorTipoComponent,

    CantidaDeLikesPorPublicacionReporteComponent,
    CantidadComentariosPorPublicacionComponent,
    CantidadEventosPorUbicacionComponent,

  ],
  imports: [
    CommonModule,
    ComponentsRoutingModule,
    HttpClientModule,
    MatTableModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatSidenavModule,
    MatListModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatMenuModule,
    FormsModule,
    MatCardModule,
    GoogleMapsModule,
    MatAutocompleteModule,
    NgChartsModule
  ]
})
export class ComponentsModule { }
