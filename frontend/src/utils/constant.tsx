import { jwtDecode } from "jwt-decode";

export const backendFastApi = "http://localhost:8000/api";

export const ACCESS_TOKEN_NAME = "e-commerce_access_token";
export const REFRESH_TOKEN_NAME = "e-commerce_refresh_token";
export let ACCESS_TOKEN: string | null = null;
export let REFRESH_TOKEN: string | null = null;
export let AUTHORIZATION = "";
export let DECODE_TOKEN: { exp: number; id: string } | undefined;

if (typeof window !== "undefined") {
  ACCESS_TOKEN = localStorage.getItem(ACCESS_TOKEN_NAME);
  REFRESH_TOKEN = localStorage.getItem(REFRESH_TOKEN_NAME);
  AUTHORIZATION = `Bearer ${ACCESS_TOKEN}`;
  DECODE_TOKEN = ACCESS_TOKEN ? jwtDecode(ACCESS_TOKEN) : undefined;
}
