export interface Mensaje{
    id: string;
    tipo: string;
    content: ContentMensaje
}
export interface ContentMensaje{
    body: string;
    footer?: string
}