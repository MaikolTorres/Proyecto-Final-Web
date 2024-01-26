import { Carrera } from "../carrera/carrera";
import { Jornada } from "../jornada/jornada";
import { Periodos } from "../periodos/periodo";

export class Curso {
    'curso_id': number;
    'curso_nombre': string;
    'curso_paralelo': string;
    'periodo_id': number;
    'carrera_id': number;
    'jornada_id': number;
  
    'carrera': Carrera;
    'jornada': Jornada;
    'periodo': Periodos;
  
    constructor(
      curso_id: number,
      curso_nombre: string,
      curso_paralelo: string,
      periodo_id: number,
      carrera_id: number,
      jornada_id: number,
      carrera?: Carrera,
      jornada?: Jornada,
      periodo?: Periodos
    ) {
      this.curso_id = curso_id;
      this.curso_nombre = curso_nombre;
      this.curso_paralelo = curso_paralelo;
      this.periodo_id = periodo_id;
      this.carrera_id = carrera_id;
      this.jornada_id = jornada_id;
  
      // Inicializar objetos relacionados si se proporcionan
      this.carrera = carrera || new Carrera(); // Puedes ajustar esto según tu lógica
      this.jornada = jornada || new Jornada();
      this.periodo = periodo || new Periodos();
    }
  }
  