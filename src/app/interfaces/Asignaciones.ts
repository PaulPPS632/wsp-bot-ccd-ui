import { Bot } from "./Bot";
import { Flows } from "./Flows";

export interface Asignaciones {
    numeros: string[];
    delaymin: number;
    delaymax: number;
    flow?: Flows;
    bot?: Bot;
}

