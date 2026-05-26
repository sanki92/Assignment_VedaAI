export type Difficulty = "Easy" | "Moderate" | "Challenging";

export type Question = {
  difficulty: Difficulty;
  text: string;
  marks: number;
};

export type Section = {
  id: string;
  title: string;
  heading: string;
  instruction: string;
  questions: Question[];
};

export type QuestionPaper = {
  message: string;
  school: string;
  subject: string;
  grade: string;
  timeAllowed: string;
  maxMarks: number;
  generalInstruction: string;
  sections: Section[];
  answerKey: string[];
};
