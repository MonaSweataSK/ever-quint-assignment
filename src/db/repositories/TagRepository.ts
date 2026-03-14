import { Repository } from '../core/Repository';
import type { Tag } from '../../types/Tag.type';

export class TagRepository extends Repository<Tag, 'tags'> {
  constructor() {
    super('tags');
  }

  async getByName(name: string): Promise<Tag | undefined> {
    const db = await this.getDB();
    return db.getFromIndex('tags', 'by-name', name);
  }
}

export const tagRepo = new TagRepository();
