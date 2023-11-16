import { auth, db } from "@/firebase/config";
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

export function subscribeToTasksCollection(
  boardId: string,
  columnId: string,
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
  const columnRef = doc(columnsRef, columnId);
  const tasksRef = collection(columnRef, "tasks");

  const q = query(tasksRef, orderBy("createdAt", "desc"));

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

/* BOARDS CRUD */

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

/* TASKS CRUD */

export function createNewTask(
  boardId: string,
  columnId: string,
  taskData: { name: string; description: string; subtasks: string[] },
) {
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
  const taskRef = doc(tasksRef);

  const subtasks: Record<string, Omit<Subtask, "id">> = {};
  taskData.subtasks.forEach((name) => {
    const id = doc(tasksRef).id;
    subtasks[id] = {
      name: name.trim(),
      completed: false,
      createdAt: serverTimestamp(),
    };
  });

  return setDoc(taskRef, {
    id: taskRef.id,
    name: taskData.name.trim(),
    createdAt: serverTimestamp(),
    description: taskData.description.trim(),
    subtasks: subtasks,
  });
}

export function updateSubtaskCompletion(
  boardId: string,
  columnId: string,
  taskId: string,
  subtaskId: string,
  completed: boolean,
) {
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
  const taskRef = doc(tasksRef, taskId);

  return updateDoc(taskRef, {
    [`subtasks.${subtaskId}.completed`]: completed,
  });
}

export async function changeTaskColumn(
  task: Task,
  boardId: string,
  oldColumnId: string,
  newColumnId: string,
) {
  const user = auth.currentUser;
  if (!user) {
    throw new Error("User is not authenticated.");
  }

  const userRef = doc(db, "users", user.uid);
  const boardsRef = collection(userRef, "boards");
  const boardRef = doc(boardsRef, boardId);
  const columnsRef = collection(boardRef, "columns");

  const oldColumnRef = doc(columnsRef, oldColumnId);
  const oldTasksRef = collection(oldColumnRef, "tasks");
  const oldTaskRef = doc(oldTasksRef, task.id);

  const newColumnRef = doc(columnsRef, newColumnId);
  const newTasksRef = collection(newColumnRef, "tasks");
  const newTaskRef = doc(newTasksRef);

  const batch = writeBatch(db);
  batch.set(newTaskRef, {
    ...task,
    id: newTaskRef.id,
    subtasks: convertSubtasksArrayToMap(task.subtasks),
  });
  batch.delete(oldTaskRef);

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

export function convertSubtasksMapToArray(
  map: Record<string, Omit<Subtask, "id">>,
): any {
  return Object.entries(map).map(([key, value]) => ({
    ...(value as Subtask),
    id: key,
  }));
}

function convertSubtasksArrayToMap(array: Subtask[]) {
  const map: Record<string, Subtask> = {};
  array.forEach((value) => {
    map[value.id] = value;
  });
  return map;
}
