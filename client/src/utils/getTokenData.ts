import { ACCESS_TOKEN } from '@types';
import { jwtDecode } from 'jwt-decode';
import { JwtPayload } from '@types';

export const getTokenData = (): JwtPayload | null => {
  const token = localStorage.getItem(ACCESS_TOKEN);
  if (!token) return null;
  try {
    return jwtDecode(token);
  } catch (error) {
    return null;
  }
};
