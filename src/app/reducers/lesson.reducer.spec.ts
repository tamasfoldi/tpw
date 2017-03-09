import { State, initialState, reducer } from './lesson.reducer';
import * as lessons from '../actions/lessons.actions';
import * as lesson from '../actions/lesson.actions';
import { Lesson } from '../models/lessons/lesson';
import { Action } from '@ngrx/store';
import { Statistic } from "../models/statistic/statistic";

describe('LessonsReducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const action = {} as Action;

      const result = reducer(undefined, action);
      expect(result).toEqual(initialState);
    });
  });

  describe('LOAD', () => {
    it('should set isLoading true', () => {
      const expectedResult: State = {
        isLoading: true,
        currentLesson: null,
        typedText: '',
        statistic: new Statistic()
      };
      const result = reducer(initialState, new lesson.LoadAction());

      expect(result).toEqual(expectedResult);
    });
  });

  describe('LOAD_SUCCESS', () => {
    it('should add the received list to the state and set loading false', () => {
      const expectedResult: State = {
        isLoading: false,
        currentLesson: { id: 'test_1', text: 'test', title: 'Test' },
        typedText: '',
        statistic: new Statistic()
      };
      const result = reducer(initialState, new lesson.LoadSuccessAction({ id: 'test_1', text: 'test', title: 'Test' }));

      expect(result).toEqual(expectedResult);
    });
  });

  describe('LOAD_LIST_FAIL', () => {
    it('should set is loading false', () => {
      const expectedResult: State = {
        isLoading: false,
        currentLesson: null,
        typedText: '',
        statistic: new Statistic()
      };
      const result = reducer(initialState, new lesson.LoadFailAction('fail'));

      expect(result).toEqual(expectedResult);
    });
  });

  describe('CLEAR', () => {
    it('should set the initialState', () => {
      const startingState: State = {
        isLoading: true,
        currentLesson: { id: 'test_1', text: 'test', title: 'Test' },
        typedText: '',
        statistic: new Statistic()
      };
      const result = reducer(startingState, new lesson.ClearAction());

      expect(result).toEqual(initialState);
    });
  });

  describe('NEW_KEY', () => {
    it('should add the correct key, start time and modify statistic', () => {
      const startingState: State = {
        isLoading: false,
        currentLesson: { id: 'test_1', text: 'test', title: 'Test' },
        typedText: '',
        statistic: new Statistic()
      };

      const result = reducer(startingState, new lesson.NewKeyAction(new KeyboardEvent('t', { code: 'KeyT', key: 't' })));

      expect(result.typedText).toEqual('t');
      expect(result.statistic.nofCorrectPress).toEqual(1);
      expect(result.statistic.nofIncorrectPress).toEqual(0);
      expect(result.statistic.startTime).not.toEqual(-1);
      expect(result.statistic.endTime).toEqual(-1);
    });

    it('should not add the incorrect key and doesnt modify statistic at first key', () => {
      const startingState: State = {
        isLoading: false,
        currentLesson: { id: 'test_1', text: 'test', title: 'Test' },
        typedText: '',
        statistic: new Statistic()
      };

      const result = reducer(startingState, new lesson.NewKeyAction(new KeyboardEvent('e', { code: 'KeyE', key: 'e' })));

      expect(result.typedText).toEqual('');
      expect(result.statistic.nofCorrectPress).toEqual(0);
      expect(result.statistic.nofIncorrectPress).toEqual(0);
      expect(result.statistic.startTime).toEqual(-1);
      expect(result.statistic.endTime).toEqual(-1);
    });

    it('should not add the incorrect key and modify statistic at not first key', () => {
      const startingState: State = {
        isLoading: false,
        currentLesson: { id: 'test_1', text: 'test', title: 'Test' },
        typedText: 'L',
        statistic: new Statistic()
      };

      const result = reducer(startingState, new lesson.NewKeyAction(new KeyboardEvent('e', { code: 'KeyE', key: 'e' })));

      expect(result.typedText).toEqual('L');
      expect(result.statistic.nofCorrectPress).toEqual(0);
      expect(result.statistic.nofIncorrectPress).toEqual(1);
      expect(result.statistic.startTime).toEqual(-1);
      expect(result.statistic.endTime).toEqual(-1);
    });

    it('should set the end timer', () => {
      const startingState: State = {
        isLoading: false,
        currentLesson: { id: 'test_1', text: 'test', title: 'Test' },
        typedText: 'tes',
        statistic: new Statistic()
      };

      const result = reducer(startingState, new lesson.NewKeyAction(new KeyboardEvent('t', { code: 'KeyT', key: 't' })));

      expect(result.typedText).toEqual('test');
      expect(result.statistic.nofCorrectPress).toEqual(1);
      expect(result.statistic.nofIncorrectPress).toEqual(0);
      expect(result.statistic.startTime).toEqual(-1);
      expect(result.statistic.endTime).not.toEqual(-1);
    });
  });



});
