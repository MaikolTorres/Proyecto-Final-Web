import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'; // Importa el HttpClientModule
import { ActualizarCargoModalComponent } from './cargo/actualizar-cargo-modal/actualizar-cargo-modal.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RolesComponent } from './roles/roles.component';
import { RecuperacionContrasenaComponent } from './recuperacion-contrasena/recuperacion-contrasena.component';
import { CrearRolComponent } from './roles/crear-rol.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { CrearUsuarioComponent } from './usuario/crear-usuario.component';
import { PersonaComponent } from './persona/persona.component';
import { CrearPersonaComponent } from './persona/crear-persona.component';
import { TituloComponent } from './titulo/titulo.component';
import { CrearTituloComponent } from './titulo/crear-titulo.component';
import { TipoContratoComponent } from './tipo-contrato/tipo-contrato.component';
import { CrearTipoContratoComponent } from './tipo-contrato/crear-tipo-contrato.component';
import { GradoOcupacionalComponent } from './grado-ocupacional/grado-ocupacional.component';
import { CrearGradoOcupacionalComponent } from './grado-ocupacional/crear-grado-ocupacional.component';
import { CargoComponent } from './cargo/cargo.component';
import { CrearCargoComponent } from './cargo/crear-cargo.component';
import { CrearJornadaComponent } from './jornada/crear-jornada.component';
import { ListarJornadaComponent } from './jornada/listar-jornada.component';
import { ListarCursoComponent } from './listar-curso/listar-curso.component';
import { CrearCursoComponent } from './listar-curso/crear-curso.component';
import { SeleccionActividadComponent } from './seleccion-actividad/seleccion-actividad.component';
import { AsignaturaComponent } from './asignatura/asignatura.component';
import { CrearAsignaturaComponent } from './asignatura/crear-asignatura.component';
//da
import { ActividadesNoDocenteComponent } from './actividades-no-docente/actividades-no-docente.component';
import { ListarActividadesNoDocentesComponent } from './listar-actividades-no-docentes/listar-actividades-no-docentes.component';
import { DocenteComponent } from './docente/docente.component';
import { CreardocenteComponent } from './docente/creardocente.component';
import { DistributivoComponent } from './distributivo/distributivo.component';
import { CreardistributivoComponent } from './distributivo/creardistributivo.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActualizarJornadaModalComponent } from './jornada/actualizar-jornada-modal/actualizar-jornada-modal.component';
//
import { ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AppRoutingModule } from './app-routing.module';
import { ListarGradoComponent } from './grado-ocupacional/listar-grado/listar-grado.component';
import { ActualizarGradoModalComponent } from './grado-ocupacional/actualizar-grado-modal/actualizar-grado-modal.component';
import { ActualizarPersonaModalComponent } from './persona/actualizar-persona-modal/actualizar-persona-modal.component';
import { ActualizarUsuarioModalComponent } from './usuario/actualizar-usuario-modal/actualizar-usuario-modal.component';
import { ActualizarRoleComponent } from './roles/actualizar-role-modal/actualizar-role-modal.component';
import { ActualizarTipocontratoModalComponent } from './tipo-contrato/actualizar-tipocontrato-modal/actualizar-tipocontrato-modal.component';
import { ActuaizarCursoComponent } from './listar-curso/actuaizar-curso/actuaizar-curso.component';
//
import { ExtraActividadesComponent } from './extra-actividades/extra-actividades.component';
import { ListarExtraActividadesComponent } from './extra-actividades/listar-extra-actividades.component';

import { ListarActividadesDocenteComponent } from './actividades-docente/listar-actividades-docente.component';
import { ActividadesDocenteComponent } from './actividades-docente/actividades-docente.component';

import { ListarCarreraComponent } from './carrera/listar-carrera.component';
import { CrearCarreraComponent } from './carrera/crear-carrera.component';
import { DatePipe } from '@angular/common';

import { CrearPeriodoComponent } from './periodos/crear-periodo.component';
import { ListarPeriodoComponent } from './periodos/listar-periodo.component';
import { ActualizarCursoModalComponent } from './listar-curso/actualizar-curso-modal/actualizar-curso-modal.component';
import { ActualizarExtraModalComponent } from './extra-actividades/actualizar-extra-modal/actualizar-extra-modal.component';
import { ActualizarCarreraModalComponent } from './carrera/actualizar-carrera-modal/actualizar-carrera-modal.component';
import { ActualizarPeriodoModalComponent } from './periodos/actualizar-periodo-modal/actualizar-periodo-modal.component';
import { ActualizarDocenteModalComponent } from './actividades-docente/actualizar-docente-modal/actualizar-docente-modal.component';
import { ActualizarAsignaturaModalComponent } from './asignatura/actualizar-asignatura-modal/actualizar-asignatura-modal.component';
import { ActuaizarDocenteModalComponent } from './docente/actuaizar-docente-modal/actuaizar-docente-modal.component';
import { ActualizarTituloComponent } from './titulo/actualizar-titulo/actualizar-titulo.component';
import { ActualizarNoDocenteComponent } from './actividades-no-docente/actualizar-no-docente/actualizar-no-docente.component';
import { HomeComponent } from './home/home.component'; 

import { GenerarpdfComponent } from './distributivo/generarpdf/generarpdf.component';
import { ActualizarDistributivoComponent } from './distributivo/actualizar-distributivo/actualizar-distributivo.component';

const routes: Routes = [
  { path: 'actualizarrDocente', component: ActuaizarDocenteModalComponent },

  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'roles', component: RolesComponent },
  { path: 'Header', component: HeaderComponent },
  { path: 'crear-rol', component: CrearRolComponent },
  { path: 'usuario', component: UsuarioComponent },
  { path: 'crearUsuario', component: CrearUsuarioComponent },
  { path: 'persona', component: PersonaComponent },
  { path: 'crearpersona', component: CrearPersonaComponent },
  { path: 'titulo', component: TituloComponent },
  { path: 'tipocontrato', component: TipoContratoComponent },
  { path: 'crearcontrato', component: CrearTipoContratoComponent },
  { path: 'cargo', component: CargoComponent },
  { path: 'crearcargo', component: CrearCargoComponent },
  { path: 'crearjornada', component: CrearJornadaComponent },
  { path: 'crearperiodo', component: CrearPeriodoComponent },
  { path: 'listarjornada', component: ListarJornadaComponent },
  { path: 'listarcurso', component: ListarCursoComponent },
  { path: 'crearcurso', component: CrearCursoComponent },
  { path: 'crear-carrera', component: CrearCarreraComponent },
  {
    path: 'recuperacion-contrasena',
    component: RecuperacionContrasenaComponent,
  },
  { path: 'creartitulo', component: CrearTituloComponent },
  { path: 'actualizartitulo', component: ActualizarTituloComponent },
  { path: 'gradoOcu', component: GradoOcupacionalComponent },
  { path: 'creargrado', component: CrearGradoOcupacionalComponent },
  { path: 'docente', component: DocenteComponent },

  { path: 'seleccion-actividad', component: SeleccionActividadComponent },
  { path: 'asignatura', component: AsignaturaComponent },
  { path: 'crearasignatura', component: CrearAsignaturaComponent },
  { path: 'actualizarcurso', component: ActuaizarCursoComponent },
  { path: 'actividades-no-docente', component: ActividadesNoDocenteComponent },
  { path: 'seleccion-actividades', component: SeleccionActividadComponent },
  {
    path: 'listar-actividades-no-docentes',
    component: ListarActividadesNoDocentesComponent,
  },
  { path: 'creardocente', component: CreardocenteComponent },
  { path: 'distributivo', component: DistributivoComponent },
  { path: 'creardistributivo', component: CreardistributivoComponent },
  //
  { path: 'abrirModalActualizar', component: ActividadesDocenteComponent },
  { path: 'listarGrado', component: ListarGradoComponent },
  //
  { path: 'listargrados', component: ListarGradoComponent },
  { path: 'actualizarper', component: ActualizarPersonaModalComponent },

  { path: 'actualizarusu', component: ActualizarUsuarioModalComponent },
  { path: 'actualizarrol', component: ActualizarRoleComponent },
  { path: 'actualizacargo', component: ActualizarCargoModalComponent },
  {
    path: 'actualizatipocontrato',
    component: ActualizarTipocontratoModalComponent,
  },
  { path: 'actualizarDocente', component: ActualizarDocenteModalComponent },

  //
  { path: 'extra-actividades', component: ExtraActividadesComponent },
  { path: 'actualizar-extra-modal', component: ActualizarExtraModalComponent },
  {
    path: 'listar-extra-actividades',
    component: ListarExtraActividadesComponent,
  },

  { path: 'actividades-docente', component: ActividadesDocenteComponent },
  {
    path: 'listar-actividades-docente',
    component: ListarActividadesDocenteComponent,
  },

  { path: 'crear-carrera', component: CrearCarreraComponent },
  { path: 'listar-carrera', component: ListarCarreraComponent },

  { path: 'crear-periodo', component: CrearPeriodoComponent },
  { path: 'listar-periodo', component: ListarPeriodoComponent },
  //
  {path: 'listar-extraactividades', component: ListarExtraActividadesComponent},
  {path:'actualizarcarrera',component:ActualizarCarreraModalComponent},
  {path:'home',component:HomeComponent},

  {path:'actualizarDistributivo',component:ActualizarDistributivoComponent},


  { path: 'actualizarcarrera', component: ActualizarCarreraModalComponent },
  { path: 'generarpdf', component: GenerarpdfComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    RolesComponent,
    RecuperacionContrasenaComponent,
    CrearRolComponent,
    FooterComponent,
    UsuarioComponent,
    CrearUsuarioComponent,
    CrearUsuarioComponent,
    CrearPersonaComponent,
    TituloComponent,
    CrearTituloComponent,
    TipoContratoComponent,
    CrearTipoContratoComponent,
    GradoOcupacionalComponent,
    CrearGradoOcupacionalComponent,
    CargoComponent,
    CrearCargoComponent,
    CrearJornadaComponent,
    ListarJornadaComponent,
    ListarCursoComponent,
    CrearCursoComponent,
    SeleccionActividadComponent,
    AsignaturaComponent,
    CrearAsignaturaComponent,
    ActividadesDocenteComponent,
    ActividadesNoDocenteComponent,
    ExtraActividadesComponent,
    ListarActividadesNoDocentesComponent,
    ListarExtraActividadesComponent,
    DocenteComponent,
    CreardocenteComponent,
    DistributivoComponent,
    CreardistributivoComponent,
    ActualizarJornadaModalComponent,
    ActualizarGradoModalComponent,
    ListarGradoComponent,
    ActualizarPersonaModalComponent,
    ActualizarUsuarioModalComponent,
    ActualizarRoleComponent,
    ActualizarCargoModalComponent,
    PersonaComponent,
    ActualizarTipocontratoModalComponent,

    //
    ExtraActividadesComponent,
    ListarExtraActividadesComponent,
    ListarActividadesDocenteComponent,
    ActividadesDocenteComponent,
    ListarCarreraComponent,
    CrearCarreraComponent,
    CrearPeriodoComponent,
    ListarPeriodoComponent,
    ActualizarCursoModalComponent,
    ActuaizarCursoComponent,
    ActualizarCarreraModalComponent,
    ActualizarPeriodoModalComponent,
    ActualizarExtraModalComponent,
    ActualizarDocenteModalComponent,
    ActualizarCarreraModalComponent,
    ActualizarAsignaturaModalComponent,
    ///
    ActualizarPeriodoModalComponent,
    ActuaizarDocenteModalComponent,

    ActualizarTituloComponent,
          ActualizarNoDocenteComponent,
          HomeComponent,
    ActualizarNoDocenteComponent,
    GenerarpdfComponent,
    ActualizarDistributivoComponent,
  ],

  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [DatePipe], // Agrega DatePipe a la lista de proveedores

  bootstrap: [AppComponent],
})
export class AppModule {}
