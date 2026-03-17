import { describe, it, expect, vi, beforeEach } from 'vitest';
import { checkAndMigrate } from '../db/migration';
import { taskRepo } from '../db/repositories/TaskRepository';
import { getDB } from '../db/core/db';
import { TASK_SCHEMA } from '../constants/taskSchema';

// Mocks
vi.mock('../db/core/db', () => ({
  getDB: vi.fn(),
}));

vi.mock('../db/repositories/TaskRepository', () => ({
  taskRepo: {
    getAll: vi.fn(),
    update: vi.fn(),
  },
}));

describe('Migration Logic: Schema Hashing', () => {
  const currentHash = btoa(JSON.stringify(TASK_SCHEMA));
  let mockDB: any;

  beforeEach(() => {
    vi.clearAllMocks();
    
    // Mock IndexedDB methods
    mockDB = {
      get: vi.fn(),
      put: vi.fn(),
    };
    (getDB as any).mockResolvedValue(mockDB);
    
    // Default: no tasks
    (taskRepo.getAll as any).mockResolvedValue([]);
  });

  it('should NOT run migration if hashes match', async () => {
    mockDB.get.mockResolvedValue({ id: 'automatedSchemaHash', value: currentHash });

    const result = await checkAndMigrate();

    expect(result).toBe(false);
    expect(taskRepo.getAll).not.toHaveBeenCalled();
    expect(mockDB.put).not.toHaveBeenCalled();
  });

  it('should RUN migration and update tasks if hashes mismatch', async () => {
    // Return an old/incorrect hash
    mockDB.get.mockResolvedValue({ id: 'automatedSchemaHash', value: 'old-hash' });
    
    // Mock one existing task that needs normalization
    const oldTask = { id: 't1', title: 'Old Task' };
    (taskRepo.getAll as any).mockResolvedValue([oldTask]);

    const result = await checkAndMigrate();

    expect(result).toBe(true);
    expect(taskRepo.getAll).toHaveBeenCalled();
    
    // Check if task was normalized (at least one field from TASK_SCHEMA should be added)
    expect(taskRepo.update).toHaveBeenCalledWith(expect.objectContaining({
      id: 't1',
      title: 'Old Task',
      priority: expect.any(String), // Default priority from schema
    }));

    // Verify new hash is saved
    expect(mockDB.put).toHaveBeenCalledWith('settings', {
      id: 'automatedSchemaHash',
      value: currentHash
    });
  });

  it('should RUN migration if no hash exists in DB', async () => {
    mockDB.get.mockResolvedValue(undefined);

    const result = await checkAndMigrate();

    expect(result).toBe(true);
    expect(mockDB.put).toHaveBeenCalledWith('settings', expect.objectContaining({ value: currentHash }));
  });
});
