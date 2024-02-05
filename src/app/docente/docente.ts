import { Cargo } from "../cargo/cargo";
import { GradoOcupacional } from "../grado-ocupacional/grado-ocupacional";
import { Periodos } from "../periodos/periodo";
import { Persona } from "../persona/persona";
import { TipoContrato } from "../tipo-contrato/tipo-contrato";
import { Titulo } from "../titulo/titulo";

export class Docente {
    'fechaFormateada': string | null;

  'docente_id': number;
  'docente_fecha_ingreso': Date;
  'docente_estado': string ;
  'persona': Partial<Persona>; // Puede ser opcional (siempre será inicializado)
  'tipo_contrato': Partial<TipoContrato>; // Puede ser opcional (siempre será inicializado)
  'cargo': Partial<Cargo>; // Puede ser opcional (siempre será inicializado)
  'titulo': Partial<Titulo>; // Puede ser opcional (siempre será inicializado)
  'periodo': Partial<Periodos>; // Puede ser opcional (siempre será inicializado)
  'grado': Partial<GradoOcupacional>; // Puede ser opcional (siempre será inicializado)

  constructor() {
    this.persona = {}; // Inicializa persona como un objeto vacío
    this.tipo_contrato = {};
    this.cargo = {};
    this.titulo = {};
    this.periodo = {};
    this.grado = {};
  }
}
