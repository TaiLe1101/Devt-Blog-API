export interface RegisterPayload {
    fullName: string;
    username: string;
    password: string;
}

export interface LoginPayload {
    username: string;
    password: string;
}

export interface RefreshTokenPayload {
    refreshToken: string;
}
