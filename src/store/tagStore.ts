import { create } from 'zustand';
import type { Tag } from '../types/Tag.type';
import { tagRepo } from '../db/repositories/TagRepository';

interface TagState {
  tags: Tag[];
  isLoading: boolean;
  error: string | null;

  loadTags: () => Promise<void>;
  addTag: (tag: Tag) => Promise<void>;
}

export const useTagStore = create<TagState>((set) => ({
  tags: [],
  isLoading: false,
  error: null,

  loadTags: async () => {
    set({ isLoading: true });
    try {
      const tags = await tagRepo.getAll();
      set({ tags, isLoading: false });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  addTag: async (tag) => {
    try {
      await tagRepo.create(tag);
      set((state) => ({ tags: [...state.tags, tag] }));
    } catch (error) {
      set({ error: (error as Error).message });
    }
  },
}));
