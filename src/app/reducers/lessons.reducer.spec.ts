import { State, initialState, reducer } from './lessons.reducer';
import * as lessons from '../actions/lessons.actions';
import * as lesson from '../actions/lesson.actions';
import * as fromLessons from './lessons.reducer';
import { Lesson } from '../../common/lesson';
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
      const expectedResult: State = Object.assign({}, initialState, { isLoading: true });
      const result = reducer(initialState, new lessons.LoadListAction());

      expect(result).toEqual(expectedResult);
    });
  });

  describe('LOAD_LIST_SUCCESS', () => {
    it('should add the received list to the state and set isLoading false', () => {
      const expectedResult: State = Object.assign({}, initialState, {
        lessonList: [{ id: '1', title: 'Test 1', isAvailable: false }]
      });

      const result = reducer(initialState, new lessons.LoadListSuccessAction([{ id: '1', title: 'Test 1', isAvailable: false }]));

      expect(result).toEqual(expectedResult);
    });
  });

  describe('LOAD_LIST_FAIL', () => {
    it('should set isLoading false', () => {
      const startingState = Object.assign({}, initialState, { isLoading: true });
      const expectedResult: State = Object.assign({}, initialState, { isLoading: false });

      const result = reducer(startingState, new lessons.LoadListFailAction('fail'));

      expect(result).toEqual(expectedResult);
    });
  });

  describe('SET_AVAIL', () => {
    it('should set isLoading true', () => {
      const expectedResult: State = Object.assign({}, initialState, { isLoading: true });
      const result = reducer(initialState, new lessons.SetAvailAction('test_1'));

      expect(result).toEqual(expectedResult);
    });
  });

  describe('SET_AVAIL_SUCCESS', () => {
    it('should set isLoading false, and set the availability', () => {
      const startingState: State = {
        isLoading: true,
        lessonList: [{ id: 'test_1', title: 'Test 1', isAvailable: false }]
      };
      const expectedResult: State = {
        isLoading: false,
        lessonList: [{ id: 'test_1', title: 'Test 1', isAvailable: true }]
      };
      const result = reducer(startingState, new lessons.SetAvailSuccessAction('test_1'));

      expect(result).toEqual(expectedResult);
    });
  });

  describe('SET_AVAIL_FAIL', () => {
    it('should set isLoading false', () => {
      const startingState: State = Object.assign({}, initialState, { isLoading: true });
      const expectedResult: State = initialState;
      const result = reducer(startingState, new lessons.SetAvailFailAction('test_1'));

      expect(result).toEqual(expectedResult);
    });
  });

  describe('getLessonList', () => {
    it('should return with the loaded lessonList', () => {
      const expectedResult = [
        { id: 'test_1', title: 'Test 1', isAvailable: true },
        { id: 'test_2', title: 'Test 2', isAvailable: true }
      ];
      const state = Object.assign({}, initialState, { lessonList: expectedResult });
      const result = fromLessons.getLessonList(state);

      expect(result).toEqual(expectedResult);
    });
  });

  describe('isLoading', () => {
    it('should return with isLoading', () => {
      const state = Object.assign({}, initialState, { isLoading: true });
      const result = fromLessons.isLoading(state);

      expect(result).toBeTruthy();
    });
  });
});
