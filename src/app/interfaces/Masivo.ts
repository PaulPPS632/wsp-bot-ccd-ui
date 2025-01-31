import { Mensaje } from "./Mensaje";

export interface Masivo{
    cant: number;
    delaymin: number;
    delaymax: number;
    mensajes: Mensaje[]
}