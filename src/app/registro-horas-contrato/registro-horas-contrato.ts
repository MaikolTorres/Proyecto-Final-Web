import { ActividadesNoDocente } from '../actividades-no-docente/actividades-no-docente';
import { RegistroHorasDocente } from '../registro-horas-docente/registro-horas-docente';

export class RegistroContrato {
  'registroContrato_id': number;
  'activiNoDoc_id': ActividadesNoDocente;
  'registroHorasDoc_id': RegistroHorasDocente;
}
