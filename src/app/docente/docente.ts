import { Cargo } from "../cargo/cargo";
import { GradoOcupacional } from "../grado-ocupacional/grado-ocupacional";
import { Periodos } from "../periodos/periodo";
import { Persona } from "../persona/persona";
import { TipoContrato } from "../tipo-contrato/tipo-contrato";
import { Titulo } from "../titulo/titulo";

export class Docente {

  'docente_id': number;
  'docente_fecha_ingreso': Date;
  'docente_estado': string ;
  'persona':Persona; // Puede ser opcional (siempre será inicializado)
  'tipo_contrato': TipoContrato; // Puede ser opcional (siempre será inicializado)
  'cargo': Cargo; // Puede ser opcional (siempre será inicializado)
  'titulo': Titulo; // Puede ser opcional (siempre será inicializado)
  'periodo': Periodos; // Puede ser opcional (siempre será inicializado)
  'grado': GradoOcupacional; // Puede ser opcional (siempre será inicializado)

 
}
