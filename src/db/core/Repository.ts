import { type IDBPDatabase, type StoreNames } from 'idb';
import { getDB, type AppSchema } from './db';

/**
 * Generic Repository class for basic IndexedDB CRUD operations.
 */
export abstract class Repository<T extends { id: string }, S extends StoreNames<AppSchema>> {
  protected storeName: S;
  protected constructor(storeName: S) {
    this.storeName = storeName;
  }

  protected async getDB(): Promise<IDBPDatabase<AppSchema>> {
    return getDB();
  }

  async getAll(): Promise<T[]> {
    const db = await this.getDB();
    return db.getAll(this.storeName) as unknown as Promise<T[]>;
  }

  async getById(id: string): Promise<T | undefined> {
    const db = await this.getDB();
    return db.get(this.storeName, id) as unknown as Promise<T | undefined>;
  }

  async create(item: T): Promise<string> {
    const db = await this.getDB();
    await db.add(this.storeName, item as any);
    return item.id;
  }

  async update(item: T): Promise<void> {
    const db = await this.getDB();
    await db.put(this.storeName, item as any);
  }

  async delete(id: string): Promise<void> {
    const db = await this.getDB();
    await db.delete(this.storeName, id);
  }

  async count(): Promise<number> {
    const db = await this.getDB();
    return db.count(this.storeName);
  }

  async clear(): Promise<void> {
    const db = await this.getDB();
    await db.clear(this.storeName);
  }
}
