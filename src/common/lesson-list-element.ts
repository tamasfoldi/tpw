import { serialize } from 'cerialize';

export class LessonListElement {
  @serialize id: string;
  @serialize title: string;
  @serialize isAvailable: boolean;

}
