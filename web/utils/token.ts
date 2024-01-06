import { jwtDecode } from 'jwt-decode';

interface Decoded {
    id: string;
    username: string;
    email: string;
    roles: string[];
    exp: number;
}

export function decodeToken(token: string | null) {
    if (!token) return null;
    return jwtDecode<Decoded>(token);
}

export function getExpirationDate(token: string | null) {
    console.log('getExpirationDate', token);
    if (!token) return new Date(0);

    const decoded = decodeToken(token);
    return decoded ? new Date(decoded.exp * 1000) : new Date(0);
}

export function hasRole(token: string | null | undefined, role: string) {
    if (!token) return false;

    const decoded = decodeToken(token);

    if (!decoded || !decoded.roles || !decoded.roles.includes) return false;
    if (!decoded.roles.includes(role)) return false;

    return true;
}

export function hasOneOfRoles(
    token: string | null | undefined,
    roles: string[]
) {
    if (!token) return false;

    const decoded = decodeToken(token);

    if (!decoded || !decoded.roles || !decoded.roles.includes) return false;
    if (!decoded.roles.some(r => roles.includes(r))) return false;

    return true;
}
