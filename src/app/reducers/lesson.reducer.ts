// tslint:disable:no-switch-case-fall-through
import * as lesson from '../actions/lesson.actions';
import { Lesson } from '../models/lessons/lesson';

export interface State {
  currentLesson: Lesson;
  typedText: string;
};

export const initialState: State = {
  currentLesson: null,
  typedText: ''
};

export function reducer(state = initialState, action: lesson.Actions): State {
  switch (action.type) {
    case lesson.ActionTypes.NEW_KEY: {
      const key: KeyboardEvent = action.payload;

      return Object.assign({}, state, { typedText: state.typedText + key.key });
    }

    default: {
      return state;
    }
  }
}

export const getLessonTitle = (state: State) => state.currentLesson.title;
export const getLessonText = (state: State) => state.currentLesson.text;
export const getLessonId = (state: State) => state.currentLesson.id;
export const getTypedText = (state: State) => state.typedText;
