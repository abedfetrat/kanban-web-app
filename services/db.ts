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
import { auth, db } from "../firebase/config";

export interface Board {
  id: string;
  name: string;
  createdAt?: FieldValue;
}

export interface Column {
  id: string;
  name: string;
  createdAt?: FieldValue;
}

export interface Task {
  id: string;
  name: string;
  createdAt?: FieldValue;
  description: string;
  subtasks: Subtask[];
}

export interface Subtask {
  id: string;
  name: string;
  createdAt?: FieldValue;
  completed: boolean;
}

export function subscribeToBoardsCollection(
  obs: (snapshot: QuerySnapshot) => void,
) {
  const user = auth.currentUser;
  if (!user) {
    throw new Error("User is not authenticated.");
  }

  const userRef = doc(db, "users", user.uid);
  const boardsRef = collection(userRef, "boards");
  const q = query(boardsRef, orderBy("createdAt", "desc"));

  return onSnapshot(q, obs);
}

export function subscribeToColumnsCollection(
  boardId: string,
  obs: (snapshot: QuerySnapshot) => void,
) {
  const user = auth.currentUser;
  if (!user) {
    throw new Error("User is not authenticated.");
  }

  const userRef = doc(db, "users", user.uid);
  const boardsRef = collection(userRef, "boards");
  const boardRef = doc(boardsRef, boardId);
  const columnsRef = collection(boardRef, "columns");
  const q = query(columnsRef, orderBy("createdAt"));

  return onSnapshot(q, obs);
}

export async function getColumnsForBoard(boardId: string) {
  const user = auth.currentUser;
  if (!user) {
    throw new Error("User is not authenticated.");
  }

  const userRef = doc(db, "users", user.uid);
  const boardsRef = collection(userRef, "boards");
  const boardRef = doc(boardsRef, boardId);
  const columnsRef = collection(boardRef, "columns");

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
  const user = auth.currentUser;
  if (!user) {
    throw new Error("User is not authenticated.");
  }

  const userRef = doc(db, "users", user.uid);
  const boardsRef = collection(userRef, "boards");
  const boardRef = doc(boardsRef, boardId);
  const columnsRef = collection(boardRef, "columns");
  const columnRef = doc(columnsRef, columnId);
  const tasksRef = collection(columnRef, "tasks");

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
  const user = auth.currentUser;
  if (!user) {
    throw new Error("User is not authenticated.");
  }

  const userRef = doc(db, "users", user.uid);
  const boardsRef = collection(userRef, "boards");
  const newBoardRef = doc(boardsRef);

  await setDoc(newBoardRef, {
    id: newBoardRef.id,
    name: name,
    createdAt: serverTimestamp(),
  });

  const columnsRef = collection(newBoardRef, "columns");
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
  const user = auth.currentUser;
  if (!user) {
    throw new Error("User is not authenticated.");
  }

  const userRef = doc(db, "users", user.uid);
  const boardsRef = collection(userRef, "boards");
  const boardRef = doc(boardsRef, board.id);
  // Update board with new name
  if (newName !== board.name) {
    await updateDoc(boardRef, { name: newName });
  }
  const columnsRef = collection(boardRef, "columns");
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
    const columnRef = doc(columnsRef, col.id);
    batch.update(columnRef, { name: col.name });
  });
  // Delete columns from db
  deleted.forEach((col) => {
    const columnRef = doc(columnsRef, col.id);
    batch.delete(columnRef);
  });

  return batch.commit();
}

export async function deleteBoard(boardId: string) {
  const user = auth.currentUser;
  if (!user) {
    throw new Error("User is not authenticated.");
  }

  const userRef = doc(db, "users", user.uid);
  const boardsRef = collection(userRef, "boards");
  const boardRef = doc(boardsRef, boardId);
  const columnsRef = collection(boardRef, "columns");

  const columns = await getColumnsForBoard(boardId);
  const batch = writeBatch(db);
  // Delete columns and associated tasks from db
  for (const col of columns) {
    const columnRef = doc(columnsRef, col.id);
    const tasksRef = collection(columnRef, "tasks");
    const tasks = await getTasksForColumn(boardId, col.id);
    for (const task of tasks) {
      const taskRef = doc(tasksRef, task.id);
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
