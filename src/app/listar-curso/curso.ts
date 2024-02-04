import { Carrera } from "../carrera/carrera";
import { Jornada } from "../jornada/jornada";
import { Periodos } from "../periodos/periodo";

export class Curso {
    'curso_id': number;
    'curso_nombre': string;
    'curso_paralelo': string;
    'modeloCarrera': Carrera;
    'modeloJornada': Jornada;
    'periodo': Periodos;
  
   
  }
  