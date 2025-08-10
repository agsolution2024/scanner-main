import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthState, User } from '@/types/attendee';

interface AuthStore extends AuthState {
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  setUser: (user: User) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (email: string, password: string) => {
        set({ isLoading: true });
        
        // Simple demo authentication - replace with real authentication
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        if (email === 'admin@rlife.com' && password === 'admin123') {
          const user: User = {
            id: '1',
            email: 'admin@rlife.com',
            name: 'Admin User',
            role: 'admin'
          };
          set({ user, isAuthenticated: true, isLoading: false });
          return true;
        } else if (email === 'scanner@rlife.com' && password === 'scanner123') {
          const user: User = {
            id: '2',
            email: 'scanner@rlife.com',
            name: 'Scanner User',
            role: 'scanner'
          };
          set({ user, isAuthenticated: true, isLoading: false });
          return true;
        }
        
        set({ isLoading: false });
        return false;
      },

      logout: () => {
        set({ user: null, isAuthenticated: false });
      },

      setUser: (user: User) => {
        set({ user, isAuthenticated: true });
      }
    }),
    {
      name: 'auth-storage',
    }
  )
);
