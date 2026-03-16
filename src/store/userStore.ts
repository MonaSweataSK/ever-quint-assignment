import { create } from 'zustand';
import type { User } from '../types/User.type';
import { userRepo } from '../db/repositories/UserRepository';

interface UserState {
  users: User[];
  isLoading: boolean;
  error: string | null;

  loadUsers: () => Promise<void>;
  addUser: (user: User) => Promise<void>;
}

export const useUserStore = create<UserState>((set) => ({
  users: [],
  isLoading: false,
  error: null,

  loadUsers: async () => {
    set({ isLoading: true });
    try {
      const users = await userRepo.getAll();
      set({ users, isLoading: false });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  addUser: async (user) => {
    try {
      await userRepo.create(user);
      set((state) => ({ users: [...state.users, user] }));
    } catch (error) {
      set({ error: (error as Error).message });
    }
  },
}));
