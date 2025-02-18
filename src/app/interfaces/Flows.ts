import { Mensaje } from "./Mensaje";

export interface Flows {
    id: number;
    name: string;
    cursos: string[];
    variables: any;
    mensajes: Mensaje[];
}