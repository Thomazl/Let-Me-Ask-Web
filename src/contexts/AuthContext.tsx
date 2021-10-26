import { createContext, ReactNode, useEffect, useState } from "react";
import { auth } from "../services/firebase";
import {signInWithPopup, GoogleAuthProvider} from "firebase/auth"

type User = {
  id: string;
  name: string;
  avatar: string;
}

type AuthContextType = {
  user: User | undefined;
  signInWithGoogle: () => Promise<void>;
}

type AuthContextProviderProps = {
  children: ReactNode;
}
//Cria o contexto de autenticação
export const AuthContext = createContext({} as AuthContextType);
//Pega as informações do usuário logado
export function AuthContextProvider(props: AuthContextProviderProps) {
  const [user, setUser] = useState<User>();
// Guarda as informações do usuário no estado
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        const { displayName, photoURL, uid } = user

        if (!displayName || !photoURL) {
          throw new Error('Missing information from Google Account.');
        }

        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL
        })
      }
    })

    return () => {
      unsubscribe();
    }
  }, [])
//Função para fazer o login com o google
  async function signInWithGoogle() {
    const provider = new GoogleAuthProvider();

    const result = await signInWithPopup(auth, provider);

    if (result.user) {
      const { displayName, photoURL, uid } = result.user
        console.log(uid)
      if (!displayName || !photoURL) {
        throw new Error('Missing information from Google Account.');
      }

      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL
      })
    }
  }
  
  return (
    <AuthContext.Provider value={{ user, signInWithGoogle }}>
      {props.children}
    </AuthContext.Provider>
  );
}