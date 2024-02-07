import { jwtDecode, JwtDecodeOptions } from 'jwt-decode';

export function CheckTokenValidity(token) {

    const decodedToken = jwtDecode(token);
    console.log(decodedToken);
    const expirationTime = decodedToken.exp * 1000;

    return Date.now() < expirationTime;
}