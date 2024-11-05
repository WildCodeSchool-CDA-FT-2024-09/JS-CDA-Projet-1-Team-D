import { ApolloError } from "@apollo/client";
import { createContext, ReactNode, useContext, useState } from "react";
import { useLoginMutation } from "../generated/graphql-types";

interface User {
  id: number;
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => void;
  loading: boolean;
  error: ApolloError | undefined;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loginMutation, { loading, error }] = useLoginMutation();

  const login = async (email: string, password: string) => {
    try {
      const { data } = await loginMutation({
        variables: {
          data: {
            email,
            password,
          },
        },
      });

      if (data?.login) {
        setUser({
          id: data.login.id,
        });
      }
    } catch (err) {
      console.error(err);
    }
    return user;
  };

  const isLoggedIn = !!user;

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error(
      "useAuth doit être utilisé à l'intérieur d'un AuthProvider"
    );
  }
  return context;
};
