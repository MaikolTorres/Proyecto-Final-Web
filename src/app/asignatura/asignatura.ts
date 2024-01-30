import { Docente } from "../docente/docente";
import { Curso } from "../listar-curso/curso";

export class Asignatura {
    'asignatura_id': number;
    'asignatura_nombre': string;
    'asignatura_horas_clase_semana': number;
    'curso': Curso;
    'modeloDocente': Docente;

}