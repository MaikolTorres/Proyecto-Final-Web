import { Cargo } from "../cargo/cargo";
import { GradoOcupacional } from "../grado-ocupacional/grado-ocupacional";
import { Periodos } from "../periodos/periodo";
import { Persona } from "../persona/persona";
import { TipoContrato } from "../tipo-contrato/tipo-contrato";
import { Titulo } from "../titulo/titulo";

export class Docente{

    'docente_id':number;
    'docente_fecha_ingreso':Date;
    'docente_estado':String;
    'persona':Persona;
    'tipo_contrato':TipoContrato;
    'cargo':Cargo;
'titulo':Titulo;
'periodo':Periodos;
'grado':GradoOcupacional;
}