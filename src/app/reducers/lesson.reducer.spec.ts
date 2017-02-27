import { reducer } from './lesson.reducer';
import * as fromLessons from './lesson.reducer';
import * as lesson from '../actions/lesson.actions';
import { Lesson } from '../models/lessons/lesson';
import { Action } from '@ngrx/store';

describe('BooksReducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const action = {} as Action;

      const result = reducer(undefined, action);
      expect(result).toEqual(fromLessons.initialState);
    });
  });

  describe('LOAD_LIST', () => {
    it('should set isLoading true', () => {
      const expectedResult = {
        isLoading: true,
        lessonList: []
      };
      const loadListSuccessAction = new lesson.LoadListAction();
      const result = reducer(fromLessons.initialState, loadListSuccessAction);

      expect(result).toEqual(expectedResult);
    });
  });

  describe('LOAD_LIST_SUCCESS', () => {
    const initialState: fromLessons.State = {
      isLoading: true,
      lessonList: []
    };
    it('should add the received list to the state and set loading false', () => {
      const expectedResult = {
        isLoading: false,
        lessonList: [{ id: 'test_1', title: 'Test 1', isCompleted: false }]
      };
      const loadListSuccessAction = new lesson.LoadListSuccessAction([{ id: 'test_1', title: 'Test 1', isCompleted: false }]);
      const result = reducer(initialState, loadListSuccessAction);

      expect(result).toEqual(expectedResult);
    });
  });

});
