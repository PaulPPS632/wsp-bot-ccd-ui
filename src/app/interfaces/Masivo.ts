import { Flows } from "./Flows";
import { Mensaje } from "./Mensaje";

export interface Masivo{
    name: string;
    cant: number;
    delaymin: number;
    delaymax: number;
    flows: Flows[]
}