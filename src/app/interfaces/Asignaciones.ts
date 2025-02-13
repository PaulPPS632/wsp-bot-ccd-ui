import { Bot } from "./Bot";
import { Flows } from "./Flows";

export interface Asignaciones {
    name: string;
    numeros: string[];
    delaymin: number;
    delaymax: number;
    flow?: Flows;
    bot?: Bot;
}

