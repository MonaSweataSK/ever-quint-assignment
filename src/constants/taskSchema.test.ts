import { describe, it, expect } from 'vitest';
import { TASK_SCHEMA, getInitialTaskState } from './taskSchema';

describe('TASK_SCHEMA', () => {
  it('should have basic required fields', () => {
    const fieldNames = TASK_SCHEMA.map(f => f.name);
    expect(fieldNames).toContain('title');
    expect(fieldNames).toContain('status');
    expect(fieldNames).toContain('priority');
  });

  it('should generate a valid initial state with all fields', () => {
    const initialState = getInitialTaskState();
    
    TASK_SCHEMA.forEach(field => {
      expect(initialState).toHaveProperty(field.name);
      expect(initialState[field.name as keyof typeof initialState]).toBe(field.defaultValue);
    });
  });

  it('should have unique field names', () => {
    const names = TASK_SCHEMA.map(f => f.name);
    const uniqueNames = new Set(names);
    expect(uniqueNames.size).toBe(names.length);
  });
});
