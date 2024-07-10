import { create } from 'zustand';

interface Question {
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
    {
      "id": 2,
      "question": "What are the pros and cons of Functional Programming?",
      "answer": "Pros of functional programming include easier reasoning about code, avoidance of side effects, and easier debugging and testing. Cons include a steeper learning curve, potential performance issues due to immutability, and less intuitive flow for those accustomed to imperative programming.",
      "category": "Technical",
      "difficulty": "Medium",
      "tags": ["Functional Programming", "Programming Paradigms"]
    },
    {
      "id": 3,
      "question": "Compare and contrast Functional Programming and Object-Oriented Programming.",
      "answer": "Functional Programming focuses on pure functions and immutability, leading to side-effect-free code and easier testing. Object-Oriented Programming emphasizes objects and their interactions to model real-world entities, using principles like inheritance and polymorphism. While FP promotes composition over inheritance, OOP often relies on inheritance hierarchies.",
      "category": "Technical",
      "difficulty": "Medium",
      "tags": ["Functional Programming", "OOP", "Programming Paradigms"]
    },
    {
      "id": 4,
      "question": "Explain the OSI Model and its layers.",
      "answer": "The OSI Model is a conceptual framework used to understand network interactions in seven layers: Physical, Data Link, Network, Transport, Session, Presentation, and Application. Each layer serves specific functions and interacts with the layers directly above and below it.",
      "category": "Technical",
      "difficulty": "Easy",
      "tags": ["Communication Protocols", "OSI Model", "Networking"]
    },
    {
      "id": 5,
      "question": "What are the differences between TCP and UDP?",
      "answer": "TCP (Transmission Control Protocol) is connection-oriented, providing reliable communication through error checking and flow control. UDP (User Datagram Protocol) is connectionless, allowing faster transmission at the expense of reliability and error checking.",
      "category": "Technical",
      "difficulty": "Easy",
      "tags": ["Communication Protocols", "TCP", "UDP", "Networking"]
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
