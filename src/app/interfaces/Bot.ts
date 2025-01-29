export interface Bot{
    id: number;
    containerId: string;
    port: number;
    pairingCode: string;
    phone: string;
    tipo: string;
    status?: boolean;
    createdAt: Date;
    updatedAt: Date;
}