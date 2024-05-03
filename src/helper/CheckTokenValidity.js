import { jwtDecode } from 'jwt-decode';

export function CheckTokenValidity(token) {

    const decodedToken = jwtDecode(token);
    const expirationTime = decodedToken.exp * 1000;

    return Date.now() < expirationTime;
}