import {
    createUserWithEmailAndPassword,
    sendEmailVerification,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
  } from 'firebase/auth';
  import { auth } from './firebaseConfig';
  
  /**
   * Registers a user with Firebase and sends an email verification.
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
  
  /**
   * Continuously checks if the user's email is verified and redirects to the profile page if true.
   */
  export const waitForEmailVerification = () => {
    const checkInterval = setInterval(async () => {
      const user = auth.currentUser;
  
      if (user) {
        await user.reload(); // Refresh user data
        if (user.emailVerified) {
          clearInterval(checkInterval); // Stop checking once verified
          console.log('Email verified. Redirecting to profile...');
          window.location.href = '/profile'; // Redirect to profile page
        }
      }
    }, 2000); // Check every 2 seconds
  };
  
/**
 * Connexion d'un utilisateur avec Firebase Authentication.
 * @param {string} email - Adresse e-mail de l'utilisateur.
 * @param {string} password - Mot de passe de l'utilisateur.
 */
export const loginUser = async (email, password) => {
    try {
      // Authentification Firebase
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      // Vérifiez si l'utilisateur a validé son email
      if (!user.emailVerified) {
        throw new Error('Veuillez vérifier votre adresse e-mail avant de vous connecter.');
      }
  
      console.log('Connexion réussie:', user.email);
      return user;
    } catch (error) {
      console.error('Erreur lors de la connexion :', error.message);
      throw error; // Relancer l'erreur pour la gestion par l'interface utilisateur
    }
  };
  
  /**
   * Protects a route by checking if the user is logged in.
   * Redirects to the sign-in page if no user is logged in.
   * @param {Function} navigate - Function to navigate to the sign-in page.
   */
  export const protectRoute = (navigate) => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate('/signin');
      }
    });
  };
  
  /**
   * Logs out the user.
   */
  export const logoutUser = async () => {
    try {
      await signOut(auth);
      console.log('Déconnexion réussie.');
    } catch (error) {
      console.error('Erreur lors de la déconnexion :', error.message);
      throw error;
    }
  };
  