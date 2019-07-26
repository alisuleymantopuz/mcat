export interface JwtPayload {
    id: number;
    email: string;
}

export interface RegistrationStatus {
    success: boolean;
    message: string;
}

export interface IToken {
    readonly token: string;
}