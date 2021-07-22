export interface User {
    id: number | null;
    nombre: string;
    email: string;
    password?: string;
    tipo_usuario: number;
    created_at?: string;
}