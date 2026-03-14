import { openDB, type IDBPDatabase, type DBSchema } from 'idb';
import type { Task } from '../../types/Task.type';
import type { User } from '../../types/User.type';
import type { Tag } from '../../types/Tag.type';

export interface AppSchema extends DBSchema {
  tasks: {
    key: string;
    value: Task;
    indexes: { 'by-status': string; 'by-priority': string; 'by-assignee': string };
  };
  users: {
    key: string;
    value: User;
    indexes: { 'by-email': string };
  };
  tags: {
    key: string;
    value: Tag;
    indexes: { 'by-name': string };
  };
}

const DB_NAME = 'ever-quint-db';
const DB_VERSION = 1;

export const initDB = async (): Promise<IDBPDatabase<AppSchema>> => {
  return openDB<AppSchema>(DB_NAME, DB_VERSION, {
    upgrade(db) {
      // Tasks Store
      const taskStore = db.createObjectStore('tasks', {
        keyPath: 'id',
      });
      taskStore.createIndex('by-status', 'status');
      taskStore.createIndex('by-priority', 'priority');
      taskStore.createIndex('by-assignee', 'assignee');

      // Users Store
      const userStore = db.createObjectStore('users', {
        keyPath: 'id',
      });
      userStore.createIndex('by-email', 'email', { unique: true });

      // Tags Store
      const tagStore = db.createObjectStore('tags', {
        keyPath: 'id',
      });
      tagStore.createIndex('by-name', 'name', { unique: true });
    },
  });
};

let dbPromise: Promise<IDBPDatabase<AppSchema>> | null = null;

export const getDB = (): Promise<IDBPDatabase<AppSchema>> => {
  if (!dbPromise) {
    dbPromise = initDB();
  }
  return dbPromise;
};
