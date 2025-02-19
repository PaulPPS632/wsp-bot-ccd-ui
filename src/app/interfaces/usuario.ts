import { Rol } from "./rol";

export interface Usuario {
    id?: number;
    name?: string;
    username: string;
    password?: string;
    rolId?: number;
    rol?: Rol;
}
