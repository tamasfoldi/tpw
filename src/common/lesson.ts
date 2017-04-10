import { serialize } from 'cerialize';

export class Lesson {
  @serialize id: string;
  @serialize title: string;
  @serialize text: string;
  @serialize difficulty: number;
  @serialize includedLetters: { [key: string]: number };
}
