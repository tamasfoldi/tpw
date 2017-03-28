import { Observable } from 'rxjs/Rx';
import { Lesson } from '../models/lessons/lesson';
import { LessonListElement } from '../models/lessons/lesson-list-element';

export const LESSONS: Lesson[] = [
  {
    id: '1',
    title: 'Lesson 1',
    text: 'Lesson one text',
    difficulty: 100,
    includedLetters: [{ 'j': 100 }]
  },
  {
    id: '2',
    title: 'Lesson 2',
    text: 'Lesson two text',
    difficulty: 200,
    includedLetters: [{ 'j': 50 }, { 'f': 50 }]
  },
  {
    id: '3',
    title: 'Lesson 3',
    text: 'Lesson three text',
    difficulty: 300,
    includedLetters: [{ 'j': 33 }, { 'f': 33 }, { 'd': 34 }]
  },
  {
    id: '4',
    title: 'Lesson 4',
    text: 'Lesson four text',
    difficulty: 400,
    includedLetters: [{ 'j': 25 }, { 'f': 25 }, { 'd': 25 }, { 'k': 25 }]
  }
];

export const LESSON_LIST: LessonListElement[] = [
  {
    id: '1',
    title: 'Lesson 1',
    isAvailable: true
  },
  {
    id: '2',
    title: 'Lesson 2',
    isAvailable: false
  },
  {
    id: '3',
    title: 'Lesson 3',
    isAvailable: false
  }, {
    id: '4',
    title: 'Lesson 4',
    isAvailable: false
  }
];
