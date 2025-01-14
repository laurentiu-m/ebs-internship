import { ACCESS_TOKEN } from '@src/app-constants';
import { JwtPayload } from '@src/types';
import { jwtDecode } from 'jwt-decode';

export const getTokenData = (): JwtPayload | null => {
  const token = localStorage.getItem(ACCESS_TOKEN);
  if (!token) return null;
  return jwtDecode(token);
};
