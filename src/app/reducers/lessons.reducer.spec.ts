import { State, initialState, reducer } from './lessons.reducer';
import * as lessons from '../actions/lessons.actions';
import { Lesson } from '../models/lessons/lesson';
import { Action } from '@ngrx/store';

describe('LessonsReducer', () => {
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
        selectedLesson: null,
        lastCompletedIdx: -1
      };
      const result = reducer(initialState, new lessons.LoadListAction());

      expect(result).toEqual(expectedResult);
    });
  });

  describe('LOAD_LIST_SUCCESS', () => {
    it('should add the received list to the state and set loading false', () => {
      const expectedResult: State = {
        isLoading: false,
        lessonList: [{ id: 'test_1', title: 'Test 1', isAvailable: false }],
        selectedLesson: null,
        lastCompletedIdx: -1
      };
      const result = reducer(initialState, new lessons.LoadListSuccessAction([{ id: 'test_1', title: 'Test 1', isAvailable: false }]));

      expect(result).toEqual(expectedResult);
    });
  });

  describe('LOAD_LIST_FAIL', () => {
    it('should set is loading false', () => {
      const expectedResult: State = {
        isLoading: false,
        lessonList: [],
        selectedLesson: null,
        lastCompletedIdx: -1
      };
      const result = reducer(initialState, new lessons.LoadListFailAction('fail'));

      expect(result).toEqual(expectedResult);
    });
  });

  describe('LOAD', () => {
    it('should set isLoading true', () => {
      const expectedResult: State = {
        isLoading: true,
        lessonList: [],
        selectedLesson: null,
        lastCompletedIdx: -1
      };
      const result = reducer(initialState, new lessons.LoadAction('test_1'));

      expect(result).toEqual(expectedResult);
    });
  });

  describe('LOAD_SUCCESS', () => {
    it('should add the received list to the state and set loading false', () => {
      const expectedResult: State = {
        isLoading: false,
        lessonList: [],
        selectedLesson: { id: 'test_1', title: 'Test 1', text: 'Test1' },
        lastCompletedIdx: -1
      };
      const result = reducer(initialState, new lessons.LoadSuccessAction({ id: 'test_1', title: 'Test 1', text: 'Test1' }));

      expect(result).toEqual(expectedResult);
    });
  });

  describe('LOAD_FAIL', () => {
    it('should set is loading false', () => {
      const expectedResult: State = {
        isLoading: false,
        lessonList: [],
        selectedLesson: null,
        lastCompletedIdx: -1
      };
      const result = reducer(initialState, new lessons.LoadListFailAction('fail'));

      expect(result).toEqual(expectedResult);
    });
  });

});
