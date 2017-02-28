import { reducer } from './lesson.reducer';
import { State, initialState } from './lesson.reducer';
import * as lesson from '../actions/lesson.actions';
import { Lesson } from '../models/lessons/lesson';
import { Action } from '@ngrx/store';

describe('LessonReducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const action = {} as Action;

      const result = reducer(undefined, action);
      expect(result).toEqual(initialState);
    });
  });

  describe('LOAD_LIST', () => {
    it('should set isLoading true', () => {
      const expectedResult: State = {
        isLoading: true,
        lessonList: [],
        selectedLesson: null
      };
      const result = reducer(initialState, new lesson.LoadListAction());

      expect(result).toEqual(expectedResult);
    });
  });

  describe('LOAD_LIST_SUCCESS', () => {
    it('should add the received list to the state and set loading false', () => {
      const expectedResult: State = {
        isLoading: false,
        lessonList: [{ id: 'test_1', title: 'Test 1', isCompleted: false }],
        selectedLesson: null
      };
      const result = reducer(initialState, new lesson.LoadListSuccessAction([{ id: 'test_1', title: 'Test 1', isCompleted: false }]));

      expect(result).toEqual(expectedResult);
    });
  });

  describe('LOAD_LIST_FAIL', () => {
    it('should set is loading false', () => {
      const expectedResult: State = {
        isLoading: false,
        lessonList: [],
        selectedLesson: null
      };
      const result = reducer(initialState, new lesson.LoadListFailAction('fail'));

      expect(result).toEqual(expectedResult);
    });
  });

  describe('LOAD', () => {
    it('should set isLoading true', () => {
      const expectedResult: State = {
        isLoading: true,
        lessonList: [],
        selectedLesson: null
      };
      const result = reducer(initialState, new lesson.LoadAction('test_1'));

      expect(result).toEqual(expectedResult);
    });
  });

  describe('LOAD_SUCCESS', () => {
    it('should add the received list to the state and set loading false', () => {
      const expectedResult: State = {
        isLoading: false,
        lessonList: [],
        selectedLesson: { id: 'test_1', title: 'Test 1', text: 'Test1' }
      };
      const result = reducer(initialState, new lesson.LoadSuccessAction({ id: 'test_1', title: 'Test 1', text: 'Test1' }));

      expect(result).toEqual(expectedResult);
    });
  });

  describe('LOAD_FAIL', () => {
    it('should set is loading false', () => {
      const expectedResult: State = {
        isLoading: false,
        lessonList: [],
        selectedLesson: null
      };
      const result = reducer(initialState, new lesson.LoadListFailAction('fail'));

      expect(result).toEqual(expectedResult);
    });
  });

});
