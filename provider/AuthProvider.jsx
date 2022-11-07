import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  FacebookAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import useAlerta from "../hooks/useAlerta";
import defaultUser from "../constants/defaultUser";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  // Estados
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);

  // useAlerta
  const [errorAuth, setCode] = useAlerta();

  // Auto login
  useEffect(() => {
    const autoLogin = onAuthStateChanged(auth, (user) => {
      if (user) {
        // si el usuario existe
        setUsuario(user);
      } else {
        // si el usuario no existe
        setUsuario(null);
      }
      setLoading(false);
    });

    return () => autoLogin();
  }, []);

  // crear user
  const crearUsuario = async (nombre, email, password) => {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await updateProfile(user, {
      displayName: nombre,
      photoURL: defaultUser,
    });

    setUsuario({
      ...user,
      displayName: nombre,
      photoURL: defaultUser,
    });
  };
  // Autenticar user
  const autenticarUsuario = async (email, password) => {
    return await signInWithEmailAndPassword(auth, email, password);
  };

  // Autenticar con Google
  const autenticarGoogle = async () => {
    const providerGoogle = new GoogleAuthProvider();
    try {
      const { user } = await signInWithPopup(auth, providerGoogle);
      setUsuario(user);
    } catch (error) {
      const code = error.code;
      setCode(code);
      console.error(error.message);
    }
  };

  // Autenticar con Facebook
  const autenticarFacebook = async () => {
    const providerFacebook = new FacebookAuthProvider();
    try {
      const { user } = await signInWithPopup(auth, providerFacebook);
      setUsuario(user);
    } catch (error) {
      const code = error.code;
      setCode(code);
      console.error(error.message);
    }
  };

  // Autenticar con Github
  const autenticarGithub = async () => {
    const providerGithub = new GithubAuthProvider();
    try {
      const { user } = await signInWithPopup(auth, providerGithub);
      setUsuario(user);
    } catch (error) {
      const code = error.code;
      setCode(code);
      console.error(error.message);
    }
  };

  // Restablecer password
  const restablecerPassword = async (email) => {
    return await sendPasswordResetEmail(auth, email, {
      url: "http://localhost:3000/auth/login",
    });
  };
  // Cerrar sesion
  const cerrarSesion = async () => {
    await signOut(auth);
    setUsuario(null);
  };

  return (
    <AuthContext.Provider
      value={{
        crearUsuario,
        autenticarUsuario,
        usuario,
        loading,
        cerrarSesion,
        restablecerPassword,
        autenticarGoogle,
        autenticarGithub,
        autenticarFacebook,
        errorAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };
export default AuthProvider;
