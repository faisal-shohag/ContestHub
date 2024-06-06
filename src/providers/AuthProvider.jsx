import { GithubAuthProvider, signInWithPopup } from 'firebase/auth';
import PropTypes from 'prop-types';
import { useEffect, useState } from "react";
import { createContext } from "react";
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import { app } from "@/firebase/firebase.config";
export const AuthContext = createContext(null);
const AuthProvider = ({ children }) => {
  const auth = getAuth(app);
  
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();
  
  const createUser = (email, password) => {
    setLoading(true)
    return createUserWithEmailAndPassword(auth, email, password);
  }

  const signIn = (email, password) => {
    setLoading(true)
    return signInWithEmailAndPassword(auth, email, password);
  }

  const googleSignIn = () => {
    setLoading(true)
    return signInWithPopup(auth, googleProvider);
  }

  const githubSignIn = () => {
    setLoading(true)
    return signInWithPopup(auth, githubProvider);
  }

  const logOut = () => {
    setLoading(true)
    return signOut(auth);
  }

  const updateUserProfile = (name, photoURL) => {
    return updateProfile(auth.currentUser, {
      displayName: name, photoURL: photoURL
    })
  }


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
      if(currentUser) {
            //get token and store in client
            
      } else {
          //
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [auth])

  const authInfo = {
    user,
    loading,
    createUser,
    signIn,
    googleSignIn,
    githubSignIn,
    logOut,
    updateUserProfile
  };
  return <AuthContext.Provider value={authInfo}>{children}
  </AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node
};

export default AuthProvider;