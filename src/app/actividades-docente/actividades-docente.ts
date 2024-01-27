import { Asignatura } from "../asignatura/asignatura";
import { ExtraActividades } from "../extra-actividades/extra-actividades";

export class ActividadesDocente{

    'actividoc_id':number;
    'actividoc_horas_docencia':number;
    'actividoc_nombre_actividad':String;
    'modeloAsignaturas':Asignatura; 
    'modeloExtrasActividades':ExtraActividades;
}