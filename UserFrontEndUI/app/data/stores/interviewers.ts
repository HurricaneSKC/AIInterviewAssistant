import { create } from 'zustand';

export interface Interviewer {
  id: string;
  name: string;
  description: string;
  level: string;
}

interface InterviewerState {
  interviewers: Interviewer[];
  addInterviewer: (newInterviewer: Interviewer) => void;
  removeInterviewer: (id: string) => void;
  updateInterviewer: (updatedInterviewer: Interviewer) => void;
}

const useInterviewerStore = create<InterviewerState>((set) => ({
  interviewers: [
    {
      "id": "Lucy",
      "name": "Lucy",
      "description": "Software Engineering",
      "level": "L3"
    },
    {
      "id": "Sarah",
      "name": "Sarah",
      "description": "Product Management",
      "level": "L5"
    }
  ],
  addInterviewer: (newInterviewer) => set((state) => ({
    interviewers: [...state.interviewers, newInterviewer]
  })),
  removeInterviewer: (id) => set((state) => ({
    interviewers: state.interviewers.filter((interviewer) => interviewer.id !== id)
  })),
  updateInterviewer: (updatedInterviewer) => set((state) => ({
    interviewers: state.interviewers.map((interviewer) =>
      interviewer.id === updatedInterviewer.id ? updatedInterviewer : interviewer
    )
  }))
}));

export default useInterviewerStore;
