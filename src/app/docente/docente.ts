import { Cargo } from "../cargo/cargo";
import { GradoOcupacional } from "../grado-ocupacional/grado-ocupacional";
import { Periodos } from "../periodos/periodo";
import { Persona } from "../persona/persona";
import { TipoContrato } from "../tipo-contrato/tipo-contrato";
import { Titulo } from "../titulo/titulo";
export class Docente {

    docente_id: number = 0;
    docente_fecha_ingreso: Date = new Date();
    docente_estado: string = '';
    persona: Persona = new Persona();
    tipo_contrato: TipoContrato = new TipoContrato();
    cargo: Cargo = new Cargo();
    titulo: Titulo = new Titulo();
    periodo: Periodos = new Periodos();
    grado: GradoOcupacional = new GradoOcupacional();

}
