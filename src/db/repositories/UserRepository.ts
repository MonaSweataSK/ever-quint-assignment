import { Repository } from '../core/Repository';
import type { User } from '../../types/User.type';

export class UserRepository extends Repository<User, 'users'> {
  constructor() {
    super('users');
  }

  async getByEmail(email: string): Promise<User | undefined> {
    const db = await this.getDB();
    return db.getFromIndex('users', 'by-email', email);
  }
}

export const userRepo = new UserRepository();
