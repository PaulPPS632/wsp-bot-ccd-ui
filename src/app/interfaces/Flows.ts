import { Mensaje } from "./Mensaje";

export interface Flows {
    id: number;
    name: string;
    cursos: string[] | null;
    variables: any;
    mensajes: Mensaje[];
}