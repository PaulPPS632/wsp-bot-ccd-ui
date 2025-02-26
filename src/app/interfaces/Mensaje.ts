import { SafeResourceUrl } from "@angular/platform-browser";

export interface Mensaje{
    id: string;
    tipo: string;
    content: ContentMensaje
}
export interface ContentMensaje{
    body: string | SafeResourceUrl;
    footer?: string
}