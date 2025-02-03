import { Mensaje } from "./Mensaje";

export interface Flows {
    id: number;
    name: string;
    mensajes: Mensaje[]
}