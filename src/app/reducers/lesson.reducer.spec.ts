import { State, initialState, reducer } from './lesson.reducer';
import * as lessons from '../actions/lessons.actions';
import * as lesson from '../actions/lesson.actions';
import * as player from '../actions/player.actions';
import { Lesson } from '../models/lessons/lesson';
import { Action } from '@ngrx/store';
import { Statistic } from '../models/statistic/statistic';

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
        statistic: new Statistic(),
        isEnded: false,
        isStarted: false,
        players: []
      };
      const result = reducer(initialState, new lesson.LoadAction('test'));

      expect(result).toEqual(expectedResult);
    });
  });

  describe('LOAD_SUCCESS', () => {
    it('should add the received list to the state and set loading false', () => {
      const expectedResult: State = {
        isLoading: false,
        currentLesson: { id: 'test_1', text: 'test', title: 'Test', difficulty: 100 },
        typedText: '',
        statistic: new Statistic(),
        isEnded: false,
        isStarted: false,
        players: []
      };
      const result = reducer(initialState, new lesson.LoadSuccessAction({ id: 'test_1', text: 'test', title: 'Test', difficulty: 100 }));

      expect(result).toEqual(expectedResult);
    });
  });

  describe('LOAD_LIST_FAIL', () => {
    it('should set is loading false', () => {
      const expectedResult: State = {
        isLoading: false,
        currentLesson: null,
        typedText: '',
        statistic: new Statistic(),
        isEnded: false,
        isStarted: false,
        players: []
      };
      const result = reducer(initialState, new lesson.LoadFailAction('fail'));

      expect(result).toEqual(expectedResult);
    });
  });

  describe('CLEAR', () => {
    it('should set the initialState', () => {
      const startingState: State = {
        isLoading: true,
        currentLesson: { id: 'test_1', text: 'test', title: 'Test', difficulty: 100 },
        typedText: '',
        statistic: new Statistic(),
        isEnded: false,
        isStarted: false,
        players: []
      };
      const result = reducer(startingState, new lesson.ClearAction());

      expect(result).toEqual(initialState);
    });
  });

  describe('player.KEY', () => {
    it('should add the correct key', () => {
      const startingState: State = {
        isLoading: true,
        currentLesson: { id: 'test_1', text: 'test', title: 'Test', difficulty: 100 },
        typedText: '',
        statistic: new Statistic(),
        isEnded: false,
        isStarted: false,
        players: []
      };

      const result = reducer(startingState, new player.KeyAction(new KeyboardEvent('t', { code: 'KeyT', key: 't' })));

      expect(result.typedText).toEqual('t');
      expect(result.statistic.nofCorrectPress).toEqual(1);
      expect(result.statistic.nofIncorrectPress).toEqual(0);
      expect(result.statistic.startTime).toEqual(-1);
      expect(result.statistic.endTime).toEqual(-1);
    });


    it('should not add the incorrect key and modify statistic', () => {
      const startingState: State = {
        isLoading: false,
        currentLesson: { id: 'test_1', text: 'test', title: 'Test', difficulty: 100 },
        typedText: 't',
        statistic: new Statistic(),
        isEnded: false,
        isStarted: false,
        players: []
      };

      const result = reducer(startingState, new player.KeyAction(new KeyboardEvent('t', { code: 'KeyT', key: 't' })));

      expect(result.typedText).toEqual('t');
      expect(result.statistic.nofCorrectPress).toEqual(0);
      expect(result.statistic.nofIncorrectPress).toEqual(1);
      expect(result.statistic.startTime).toEqual(-1);
      expect(result.statistic.endTime).toEqual(-1);
    });

    it('should return state on not char or space', () => {
      const startingState: State = {
        isLoading: false,
        currentLesson: { id: 'test_1', text: 'test', title: 'Test', difficulty: 100 },
        typedText: 't',
        statistic: new Statistic(),
        isEnded: false,
        isStarted: false,
        players: []
      };

      const result = reducer(startingState, new player.KeyAction(new KeyboardEvent('t', { code: 'Digit1', key: 't' })));

      expect(result).toEqual(startingState);

    });
  });



});
