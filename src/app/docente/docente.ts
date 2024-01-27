import { Cargo } from "../cargo/cargo";
import { Periodos } from "../periodos/periodo";
import { Persona } from "../persona/persona";
import { TipoContrato } from "../tipo-contrato/tipo-contrato";
import { Titulo } from "../titulo/titulo";

export class Docente{

    'docente_id':String;
    'docente_fecha_ingreso':Date;
    'docente_estado':String;
    'persona':Persona;
    'tipo_contrato':TipoContrato;
    'cargo':Cargo;
'titulo':Titulo;
'periodo':Periodos;
}