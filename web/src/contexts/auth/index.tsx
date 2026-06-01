import cookies from "js-cookie"
import { useNavigate } from "@tanstack/react-router"
import { createContext, useContext, useEffect, useState, type PropsWithChildren } from "react"

import type { User } from "@/http/generated/api.schemas";
import { useAuthenticationLogin, useAuthenticationLogout } from "@/http/generated/authentication/authentication";

export interface Credentials {
  email: string;
  password: string;
}

export interface AuthenticationContextProps {
  signIn: (data: Credentials) => void;
  signOut: () => void,
  user: User | null,
  token: string | null
}

export const USER_COOKIE_NAME = "@_USER_COOKIE"
export const TOKEN_COOKIE_NAME = "@_TOKEN_COOKIE";

export const AuthenticationContext = createContext({} as AuthenticationContextProps)

export function AuthenticationProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<null | User>(() => {
    const data = cookies.get(USER_COOKIE_NAME);

    if (!data) {
      return null
    }

    return JSON.parse(data) as User
  });

  const [token, setToken] = useState<null | string>(() => {
    const data = cookies.get(TOKEN_COOKIE_NAME);

    if (!data) {
      return null
    }

    return data
  });

  const navigate = useNavigate()

  const { mutateAsync: signInAPI } = useAuthenticationLogin({
    mutation: {
      onSuccess(data) {
        setUser(data.user);
        setToken(data.token);

        cookies.set(USER_COOKIE_NAME, JSON.stringify(data.user))
        cookies.set(TOKEN_COOKIE_NAME, data.token)

        navigate({ to: "/me/home" })
      },
      onError(error) {
        alert(error.response?.data.message || "Erro ao tentar fazer o login")
      }
    }
  })
  const { mutateAsync: signOutAPI } = useAuthenticationLogout({
    mutation: {
      onSuccess() {
        cookies.remove(USER_COOKIE_NAME)
        cookies.remove(TOKEN_COOKIE_NAME)

        navigate({ to: "/login" })
      }
    }
  })

  const signIn = async (data: Credentials) => await signInAPI({ data })

  const signOut = async () => await signOutAPI()

  useEffect(() => {
    if (!token || !user) {
      navigate({ to: "/login" })
    }
  }, [navigate, token, user])

  return (
    <AuthenticationContext.Provider value={{ user, token, signIn, signOut, }}>
      {children}
    </AuthenticationContext.Provider>
  )
}

export const useAuthentication = () => useContext(AuthenticationContext)