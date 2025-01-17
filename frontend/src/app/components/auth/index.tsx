"use client";
import { ReactNode, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import axiosInstance from "@/utils/axiosInstance";
import {
  ACCESS_TOKEN,
  ACCESS_TOKEN_NAME,
  REFRESH_TOKEN,
  REFRESH_TOKEN_NAME,
} from "@/utils/constant";

type props = { children: ReactNode };

export default function Auth({ children }: props) {
  useEffect(() => {
    (async () => {
      if (ACCESS_TOKEN) {
        const decodedToken = jwtDecode(ACCESS_TOKEN);
        if (decodedToken.exp) {
          const currentTime = Math.floor(Date.now() / 1000);
          const timeToExpire = decodedToken.exp - currentTime;
          const timeoutId = setTimeout(async () => {
            try {
              const response = await axiosInstance.post(`/refresh_token`, {
                refresh_token: REFRESH_TOKEN,
              });
              if (typeof window !== "undefined") {
                localStorage.setItem(
                  ACCESS_TOKEN_NAME,
                  response.data.access_token
                );
                localStorage.setItem(
                  REFRESH_TOKEN_NAME,
                  response.data.refresh_token
                );
              }
              window.location.reload();
            } catch (error) {
              console.log(error);
              if (typeof window !== "undefined") {
                localStorage.removeItem(ACCESS_TOKEN_NAME);
                localStorage.removeItem(REFRESH_TOKEN_NAME);
              }
              setTimeout(() => {
                window.location.href = "/login";
              }, 200);
            }
          }, timeToExpire * 1000);
          return () => clearTimeout(timeoutId);
        }
      }
    })();
  }, []);

  if (ACCESS_TOKEN) {
    return <>{children}</>;
  } else {
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
  }
}
