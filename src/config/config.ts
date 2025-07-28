export enum statusCodes {
    OK= 200,
    CREATED = 201,
    BAD_REQUEST = 400,
    FORBIDDEN = 401,
    UNAUTHORIZED = 403,
    NOT_FOUND = 404,
    INTERNAL_SERVER_ERROR = 500
}

export const JWT_SECRET = process.env.JWT_SECRET ?? "";
export const EXPIRES_IN = process.env.JWT_EXPIRES_IN ?? '1D';
