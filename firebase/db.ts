import {
  FieldValue,
  QuerySnapshot,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  writeBatch,
} from "firebase/firestore";
import { auth, db } from "./firebaseApp";

export type Board = {
  id: string;
  name: string;
  createdAt: FieldValue;
};

export type Column = {
  id: string;
  name: string;
  createdAt: FieldValue;
};

export function subscribeToBoardsCollection(
  obs: (snapshot: QuerySnapshot) => void,
) {
  const uid = auth.currentUser?.uid;
  if (!uid) return () => {};

  const userRef = doc(db, "users", uid);
  const boardsRef = collection(db, userRef.path, "boards");
  const q = query(boardsRef, orderBy("createdAt", "desc"));

  return onSnapshot(q, obs);
}

export async function createNewBoard(name: string, columns: string[]) {
  const uid = auth.currentUser?.uid;
  if (!uid) return Promise.reject("User ID not found.");

  const userRef = doc(db, "users", uid);
  const boardsRef = collection(db, userRef.path, "boards");
  const newBoardRef = doc(boardsRef);
  await setDoc(newBoardRef, {
    id: newBoardRef.id,
    name: name,
    createdAt: serverTimestamp(),
  });

  const columnsRef = collection(db, newBoardRef.path, "columns");
  const batch = writeBatch(db);
  columns.forEach((col) => {
    const columnRef = doc(columnsRef);
    batch.set(columnRef, {
      id: columnRef.id,
      name: col,
      createdAt: serverTimestamp(),
    });
  });

  return batch.commit();
}
