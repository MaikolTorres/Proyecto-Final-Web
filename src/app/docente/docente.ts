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
    'persona': Partial<Persona>;
    'tipo_contrato': Partial<TipoContrato>;
    'cargo': Partial<Cargo>;
    'titulo': Partial<Titulo>;
    'periodo': Partial<Periodos>;
    'grado': Partial<GradoOcupacional>;
    constructor() {
        this.persona = {}; // Inicializa persona como un objeto vacío
        this.tipo_contrato = {};
        this.cargo = {};
        this.titulo = {};
        this.periodo = {};
        this.grado = {};


    }
}
