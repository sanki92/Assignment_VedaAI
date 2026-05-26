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

export const samplePaper: QuestionPaper = {
  message:
    "Certainly, Lakshya! Here are customized Question Paper for your CBSE Grade 8 Science classes on the NCERT chapters:",
  school: "Delhi Public School, Sector-4, Bokaro",
  subject: "English",
  grade: "5th",
  timeAllowed: "45 minutes",
  maxMarks: 20,
  generalInstruction: "All questions are compulsory unless stated otherwise.",
  sections: [
    {
      id: "A",
      title: "Section A",
      heading: "Short Answer Questions",
      instruction: "Attempt all questions. Each question carries 2 marks",
      questions: [
        {
          difficulty: "Easy",
          text: "Define electroplating. Explain its purpose.",
          marks: 2,
        },
        {
          difficulty: "Moderate",
          text: "What is the role of a conductor in the process of electrolysis?",
          marks: 2,
        },
        {
          difficulty: "Easy",
          text: "Why does a solution of copper sulfate conduct electricity?",
          marks: 2,
        },
        {
          difficulty: "Moderate",
          text: "Describe one example of the chemical effect of electric current in daily life.",
          marks: 2,
        },
        {
          difficulty: "Moderate",
          text: "Explain why electric current is said to have chemical effects.",
          marks: 2,
        },
        {
          difficulty: "Challenging",
          text: "How is sodium hydroxide prepared during the electrolysis of brine? Write the chemical reaction involved.",
          marks: 2,
        },
        {
          difficulty: "Challenging",
          text: "What happens at the cathode and anode during the electrolysis of water? Name the gases evolved.",
          marks: 2,
        },
        {
          difficulty: "Easy",
          text: "Mention the type of current used in electroplating and justify why it is used.",
          marks: 2,
        },
        {
          difficulty: "Moderate",
          text: "What is the importance of electric current in the field of metallurgy?",
          marks: 2,
        },
        {
          difficulty: "Challenging",
          text: "Explain with a chemical equation how copper is deposited during the electroplating of an object.",
          marks: 2,
        },
      ],
    },
  ],
  answerKey: [
    "Electroplating is the process of depositing a thin layer of metal on the surface of another metal using electric current. Its purpose is to prevent corrosion, improve appearance, or increase thickness.",
    "A conductor allows the flow of electric current, causing ions in the electrolyte to move and enabling chemical changes at electrodes.",
    "Copper sulfate solution contains free copper and sulfate ions which carry electric charge, thus conducting electricity.",
    "An example is the electroplating of silver on jewelry to prevent tarnishing.",
    "Electric current causes the movement of ions leading to chemical changes at the electrodes, hence it shows chemical effects.",
    "Sodium hydroxide is formed at the cathode during brine electrolysis as water gains electrons:\n2H2O + 2e- → H2 + 2OH-\nNa+ + OH- → NaOH (in solution)",
    "At the cathode: water is reduced to hydrogen gas and hydroxide ions.\nAt the anode: water is oxidized to oxygen gas and hydrogen ions.",
    "Direct current is used in electroplating because a steady one directional flow deposits metal uniformly on the object.",
    "Electric current is used in metallurgy to extract and refine metals through electrolysis, such as the purification of copper and the extraction of aluminium.",
    "Copper is deposited at the cathode when current passes through copper sulfate solution: Cu2+ + 2e- to Cu, coating the object with a layer of copper.",
  ],
};
