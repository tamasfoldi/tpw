export interface Lesson {
  id: string;
  title: string;
  text: string;
  difficulty: number;
  includedLetters: { [key: string]: number };
}
