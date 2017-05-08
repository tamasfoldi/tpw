import { Observable } from 'rxjs/Rx';
import { Lesson } from '../../common/lesson';
import { LessonListElement } from '../../common/lesson-list-element';
import { Statistic } from '../../common/statistic';

export const LESSONS: Lesson[] = [
  {
    id: '1',
    title: 'Lesson 1',
    text: 'Lesson one text',
    difficulty: 100,
    includedLetters: {
      'j': 50,
      'f': 50
    }
  },
  {
    id: '2',
    title: 'Lesson 2',
    text: 'Lesson two text',
    difficulty: 120,
    includedLetters: {
      'j': 25,
      'f': 25,
      'd': 25,
      'k': 25
    }
  },
  {
    id: '3',
    title: 'Lesson 3',
    text: 'Lesson three text',
    difficulty: 140,
    includedLetters: {
      'j': 16,
      'f': 16,
      'd': 16,
      'k': 16,
      'l': 16,
      's': 16
    }
  },
  {
    id: '4',
    title: 'Lesson 4',
    text: 'Lesson four text',
    difficulty: 160,
    includedLetters: {
      'j': 12,
      'f': 12,
      'd': 12,
      'k': 12,
      'l': 12,
      's': 12,
      'a': 12,
      ';': 12
    }
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

export const STATISTIC: Statistic = new Statistic(
  {
    endTime: -1,
    startTime: -2,
    mistakes: {
      'e': {
        'j': 1,
        'k': 2
      },
      'f': {
        'e': 3
      }
    },
    nofCorrectPress: 100
  }
);
