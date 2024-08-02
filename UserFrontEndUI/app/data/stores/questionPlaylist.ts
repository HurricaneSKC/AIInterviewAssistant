import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export interface Question {
  id: number;
  question: string;
  answer: string;
  category: string;
  difficulty: string;
  tags: string[];
}

interface QuestionState {
  questions: Question[];
  addQuestion: (newQuestion: Question) => void;
  removeQuestion: (id: number) => void;
  removeAllQuestions: () => void;
  updateQuestion: (updatedQuestion: Question) => void;
}

const useQuestionPlaylistStore = create(
  persist<QuestionState>(
    (set) => ({
      questions: [],
      addQuestion: (newQuestion) => set((state) => ({
        questions: [...state.questions, newQuestion]
      })),
      removeQuestion: (id) => set((state) => ({
        questions: state.questions.filter((question) => question.id !== id)
      })),
      removeAllQuestions: () => set({ questions: [] }),
      updateQuestion: (updatedQuestion) => set((state) => ({
        questions: state.questions.map((question) =>
          question.id === updatedQuestion.id ? updatedQuestion : question
        )
      }))
    }),
    {
      name: 'question-playlist',
      storage: createJSONStorage(() => sessionStorage),
    },
  )
);

export default useQuestionPlaylistStore;
