import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface QuestionAnswered {
  QuestionId: number;
  transcript: string;
  evaluation: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  password_hash: string;
  created_at: string;
  questionsAnswered: QuestionAnswered[];
}

export interface UserState {
  user: User;
  setUser: (user: User) => void;
  addQuestionAnswered: (newQuestionAnswered: QuestionAnswered) => void;
  removeQuestionAnswered: (id: number) => void;
  removeAllQuestionsAnswered: () => void;
}

const useUserStore = create(
  persist<UserState>(
    (set) => ({
      user: {
        id: 0,
        name: '',
        email: '',
        role: '',
        password_hash: '',
        created_at: '',
        questionsAnswered: [],
      },
      setUser: (user) => set({ user }),
      addQuestionAnswered: (newQuestionAnswered: QuestionAnswered) => set((state) => ({
        user: {
          ...state.user,
          questionsAnswered: [...state.user.questionsAnswered, newQuestionAnswered],
        },
      })),
      removeQuestionAnswered: (id: number) => set((state) => ({
        user: {
          ...state.user,
          questionsAnswered: state.user.questionsAnswered.filter((question) => question.QuestionId !== id),
        },
      })),
      removeAllQuestionsAnswered: () => set((state) => ({
        user: {
          ...state.user,
          questionsAnswered: [],
        },
      })),
    }),
    {
      name: 'user',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useUserStore;
