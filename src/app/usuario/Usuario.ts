import { Persona } from "../persona/persona";
import { Rol } from "../roles/roles";

export class Usuario {
    'usu_id': number;
    'username': string;
    'usu_contrasena': string;
    'persona': Partial<Persona>; // Utiliza Partial<Persona> para permitir propiedades parciales de Persona
    'rol':  Partial<Rol>;

    constructor() {
        this.persona = {}; // Inicializa persona como un objeto vacío
        this.rol = {};
    }
}
