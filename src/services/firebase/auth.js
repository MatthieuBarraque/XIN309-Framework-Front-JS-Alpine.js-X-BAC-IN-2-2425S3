import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  onAuthStateChanged as firebaseOnAuthStateChanged,
  signOut as firebaseSignOut,
} from 'firebase/auth';
import { auth } from './firebaseConfig';

  /**
   * @param {string} email - The user's email address.
   * @param {string} password - The user's password.
   */
  export const registerUser = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      if (!user) throw new Error("Échec de l'inscription.");
  
      // Send email verification
      await sendEmailVerification(user);
      console.log('Email de vérification envoyé à :', email);
    } catch (error) {
      console.error('Erreur lors de l’inscription :', error.message);
      throw error;
    }
  };
  
  export const waitForEmailVerification = () => {
    const checkInterval = setInterval(async () => {
      const user = auth.currentUser;
  
      if (user) {
        await user.reload();
        if (user.emailVerified) {
          clearInterval(checkInterval);
          console.log('Email verified. Redirecting to profile...');
          window.location.href = '/profile'; // Redirect to profile page
        }
      }
    }, 2000);
  };
  
  /**
   * @param {string} email - User's email address.
   * @param {string} password - User's password.
   */
  export const loginUser = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      // Check if the user's email is verified
      if (!user.emailVerified) {
        throw new Error('Veuillez vérifier votre adresse e-mail avant de vous connecter.');
      }
  
      console.log('Connexion réussie:', user.email);
      return user;
    } catch (error) {
      console.error('Erreur lors de la connexion :', error.message);
      throw error; // Re-throw the error for UI handling
    }
  };
  
  /**
   * @param {Function} navigate - Function to navigate to the sign-in page.
   */
  export const protectRoute = (navigate) => {
    firebaseOnAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate('/signin');
      }
    });
  };
  
  export const logoutUser = async () => {
    try {
      await firebaseSignOut(auth);
      console.log('Déconnexion réussie.');
      window.location.href = '/';
    } catch (error) {
      console.error('Erreur lors de la déconnexion :', error.message);
      throw error;
    }
  };
  
  /**
   * @param {Function} onAuthenticated - Callback when the user is authenticated.
   * @param {Function} onUnauthenticated - Callback when the user is not authenticated.
   */
  export const monitorAuthState = (onAuthenticated, onUnauthenticated) => {
    firebaseOnAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('Utilisateur connecté :', user.email);
        onAuthenticated(user);
      } else {
        console.log('Aucun utilisateur connecté.');
        onUnauthenticated();
      }
    });
  };
  
  console.log('Auth module loaded');
  export {
    auth,
    firebaseOnAuthStateChanged as onAuthStateChanged,
    firebaseSignOut as signOut,
  };