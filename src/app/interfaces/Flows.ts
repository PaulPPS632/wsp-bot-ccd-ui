import { Mensaje } from "./Mensaje";

export interface Flows {
    id: number;
    name: string;
    listacursos: string[];
    variables: any;
    mensajes: Mensaje[];
}