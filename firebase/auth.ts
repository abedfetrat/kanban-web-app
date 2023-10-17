import {
  GithubAuthProvider,
  GoogleAuthProvider,
  User,
  isSignInWithEmailLink,
  sendSignInLinkToEmail,
  signInAnonymously,
  signInWithEmailLink,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "./firebaseApp";

export type UserType = User | null;

export function onAuthStateChanged(cb: (user: UserType) => void) {
  return auth.onAuthStateChanged(cb);
}

export function logInWithGoogle() {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
}

export function logInWithGithHub() {
  const provider = new GithubAuthProvider();
  return signInWithPopup(auth, provider);
}

export function logInAnonymously() {
  return signInAnonymously(auth);
}

export function logInWithEmailLink(email: string, link: string) {
  return signInWithEmailLink(auth, email, link);
}

export function logOut() {
  auth.signOut();
}

export function sendLogInLinkToEmail(email: string) {
  const actionCodeSettings = {
    url: "https://abedfetrat.github.io/kanban-web-app/email",
    handleCodeInApp: true,
  };
  return sendSignInLinkToEmail(auth, email, actionCodeSettings);
}

export function isLogInWithEmailLink(link: string) {
  return isSignInWithEmailLink(auth, link);
}
