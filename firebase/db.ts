import {
  FieldValue,
  QuerySnapshot,
  collection,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  writeBatch,
} from "firebase/firestore";
import { auth, db } from "./firebaseApp";

export type Board = {
  id: string;
  name: string;
  createdAt?: FieldValue;
};

export type Column = {
  id: string;
  name: string;
  createdAt?: FieldValue;
};

export type Task = {
  id: string;
  name: string;
  createdAt?: FieldValue;
  description: string;
  subtasks: Subtask[];
};

export type Subtask = {
  id: string;
  name: string;
  createdAt?: FieldValue;
  completed: boolean;
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

export function subscribeToColumnsCollection(
  boardId: string,
  obs: (snapshot: QuerySnapshot) => void,
) {
  const uid = auth.currentUser?.uid;
  if (!uid) return () => {};

  const userRef = doc(db, "users", uid);
  const boardsRef = collection(db, userRef.path, "boards");
  const boardRef = doc(db, boardsRef.path, boardId);
  const columnsRef = collection(db, boardRef.path, "columns");
  const q = query(columnsRef, orderBy("createdAt"));

  return onSnapshot(q, obs);
}

export async function getColumnsForBoard(boardId: string) {
  const uid = auth.currentUser?.uid;
  if (!uid) return Promise.reject("User ID not found.");

  const userRef = doc(db, "users", uid);
  const boardsRef = collection(db, userRef.path, "boards");
  const boardRef = doc(db, boardsRef.path, boardId);
  const columnsRef = collection(db, boardRef.path, "columns");

  const q = query(columnsRef, orderBy("createdAt"));
  const snapshot = await getDocs(q);

  let columns: Column[] = [];
  snapshot.forEach((doc) => {
    const data = doc.data();
    columns.push({
      id: data.id,
      name: data.name,
      createdAt: data.createdAt,
    });
  });

  return columns;
}

export async function getTasksForColumn(boardId: string, columnId: string) {
  const uid = auth.currentUser?.uid;
  if (!uid) return Promise.reject("User ID not found.");

  const userRef = doc(db, "users", uid);
  const boardsRef = collection(db, userRef.path, "boards");
  const boardRef = doc(db, boardsRef.path, boardId);
  const columnsRef = collection(db, boardRef.path, "columns");
  const columnRef = doc(db, columnsRef.path, columnId);
  const tasksRef = collection(db, columnRef.path, "tasks");

  const q = query(tasksRef);
  const snapshot = await getDocs(q);

  let tasks: Task[] = [];
  snapshot.forEach((doc) => {
    const data = doc.data();
    tasks.push({
      id: data.id,
      name: data.name,
      createdAt: data.createdAt,
      description: data.description,
      subtasks: data.subtasks,
    });
  });

  return tasks;
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

  await batch.commit();

  return newBoardRef.id;
}

export async function editBoard(
  board: Board,
  newName: string,
  newColumns: Column[],
  oldColumns: Column[],
) {
  const uid = auth.currentUser?.uid;
  if (!uid) return Promise.reject("User ID not found.");

  const userRef = doc(db, "users", uid);
  const boardsRef = collection(db, userRef.path, "boards");
  const boardRef = doc(db, boardsRef.path, board.id);
  // Update board with new name
  if (newName !== board.name) {
    await updateDoc(boardRef, { name: newName });
  }
  const columnsRef = collection(db, boardRef.path, "columns");
  const batch = writeBatch(db);
  const { added, updated, deleted } = compareColumns(oldColumns, newColumns);
  // Add all new columns to db
  added.forEach((col) => {
    const columnRef = doc(columnsRef);
    batch.set(columnRef, {
      id: columnRef.id,
      name: col.name,
      createdAt: serverTimestamp(),
    });
  });
  // Update db with updated columns
  updated.forEach((col) => {
    const columnRef = doc(db, columnsRef.path, col.id);
    batch.update(columnRef, { name: col.name });
  });
  // Delete columns from db
  deleted.forEach((col) => {
    const columnRef = doc(db, columnsRef.path, col.id);
    batch.delete(columnRef);
  });

  return batch.commit();
}

export async function deleteBoard(boardId: string) {
  const uid = auth.currentUser?.uid;
  if (!uid) return Promise.reject("User ID not found.");

  const userRef = doc(db, "users", uid);
  const boardsRef = collection(db, userRef.path, "boards");
  const boardRef = doc(db, boardsRef.path, boardId);
  const columnsRef = collection(db, boardRef.path, "columns");

  const columns = await getColumnsForBoard(boardId);
  const batch = writeBatch(db);
  // Delete columns and associated tasks from db
  for (const col of columns) {
    const columnRef = doc(db, columnsRef.path, col.id);
    const tasksRef = collection(db, columnRef.path, "tasks");
    const tasks = await getTasksForColumn(boardId, col.id);
    for (const task of tasks) {
      const taskRef = doc(db, tasksRef.path, task.id);
      batch.delete(taskRef);
    }
    batch.delete(columnRef);
  }
  // Delete board
  batch.delete(boardRef);

  return batch.commit();
}

/* Helper functions */

function compareColumns(oldColumns: Column[], newColumns: Column[]) {
  const added: Column[] = [];
  const updated: Column[] = [];
  const deleted: Column[] = [];

  // Create map for efficient lookup
  const newMap = new Map();
  newColumns.forEach((col) => newMap.set(col.id, col));

  // Check for updated and deleted items
  oldColumns.forEach((oldCol) => {
    const newCol = newMap.get(oldCol.id);
    if (newCol) {
      if (newCol.name !== oldCol.name) {
        updated.push(newCol);
      }
    } else {
      deleted.push(oldCol);
    }
  });

  // Check for added items
  newColumns.forEach((newCol) => {
    if (!oldColumns.some((oldCol) => oldCol.id === newCol.id)) {
      added.push(newCol);
    }
  });

  return { added, updated, deleted };
}
