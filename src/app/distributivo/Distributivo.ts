import { Carrera } from '../carrera/carrera';
import { Jornada } from '../jornada/jornada';
import { Curso } from '../listar-curso/curso';
import { Periodos } from '../periodos/periodo';
import { Asignatura } from '../asignatura/asignatura';
import { ActividadesDocente } from '../actividades-docente/actividades-docente';
import { ActividadesNoDocente } from '../actividades-no-docente/actividades-no-docente';
import { Docente } from '../docente/docente';
import { RegistroContrato } from '../registro-horas-contrato/registro-horas-contrato';

export class Distributivo {
  'distributivo_id': number;
  'carrera_id': Carrera;
  'jornada_id': Jornada;
  'curso_id': Curso;
  'periodo_id': Periodos;
  'asignatura_id': Asignatura;
  'actividoc_id': ActividadesDocente;
  'activinodoc_id': ActividadesNoDocente;
  'docente_id': Docente;
  'registrocontrato_id': RegistroContrato;
}
