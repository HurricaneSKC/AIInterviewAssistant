import { create } from 'zustand';

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
  updateQuestion: (updatedQuestion: Question) => void;
}

const useQuestionPlaylistStore = create<QuestionState>((set) => ({
  questions: [
    {
      id: 1,
      question: "Explain the principles of Object-Oriented Programming (OOP).",
      answer: "The main principles of OOP are inheritance, abstraction, encapsulation, and polymorphism. Inheritance allows classes to inherit properties and methods from other classes. Abstraction simplifies complex reality by modeling classes appropriate to the problem. Encapsulation hides the internal state of the object and only exposes what is necessary. Polymorphism allows methods to do different things based on the object it is acting upon.",
      category: "Technical",
      difficulty: "Easy",
      tags: ["OOP", "Programming Paradigms", "Java"]
    },
    // ... (other questions)
  ],
  addQuestion: (newQuestion) => set((state) => ({
    questions: [...state.questions, newQuestion]
  })),
  removeQuestion: (id) => set((state) => ({
    questions: state.questions.filter((question) => question.id !== id)
  })),
  updateQuestion: (updatedQuestion) => set((state) => ({
    questions: state.questions.map((question) =>
      question.id === updatedQuestion.id ? updatedQuestion : question
    )
  }))
}));

export default useQuestionPlaylistStore;
