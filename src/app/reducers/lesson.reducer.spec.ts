import { State, initialState, reducer } from './lesson.reducer';
import * as lessons from '../actions/lessons.actions';
import * as lesson from '../actions/lesson.actions';
import * as player from '../actions/player.actions';
import * as fromLesson from './lesson.reducer';
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
      expect(result.statistic.mistakes).toEqual({});
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
      expect(result.statistic.mistakes['e']['t']).toEqual(1);
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

  describe('palyer.NEW', () => {
    it('should set add a new player to state', () => {
      const expextedState: State = {
        isLoading: false,
        currentLesson: null,
        typedText: '',
        statistic: new Statistic(),
        isEnded: false,
        isStarted: false,
        players: [{ id: 'test', progress: 0, state: 'NOT_READY' }]
      };
      const result = reducer(initialState, new player.NewAction('test'));

      expect(result).toEqual(expextedState);
    });
  });

  describe('palyer.PROGRESS', () => {
    it('should add new progress to player', () => {
      const startingState: State = {
        isLoading: false,
        currentLesson: null,
        typedText: '',
        statistic: new Statistic(),
        isEnded: false,
        isStarted: false,
        players: [{ id: 'test', progress: 0, state: 'NOT_READY' }]
      };
      const expextedState: State = {
        isLoading: false,
        currentLesson: null,
        typedText: '',
        statistic: new Statistic(),
        isEnded: false,
        isStarted: false,
        players: [{ id: 'test', progress: 50, state: 'NOT_READY' }]
      };
      const result = reducer(startingState, new player.ProgressAction({ id: 'test', progress: 50 }));

      expect(result).toEqual(expextedState);
    });
  });

  describe('palyer.READY', () => {
    it('should set a players state to READY', () => {
      const startingState: State = {
        isLoading: false,
        currentLesson: null,
        typedText: '',
        statistic: new Statistic(),
        isEnded: false,
        isStarted: false,
        players: [{ id: 'test', progress: 0, state: 'NOT_READY' }]
      };
      const expextedState: State = {
        isLoading: false,
        currentLesson: null,
        typedText: '',
        statistic: new Statistic(),
        isEnded: false,
        isStarted: false,
        players: [{ id: 'test', progress: 0, state: 'READY' }]
      };
      const result = reducer(startingState, new player.ReadyAction('test'));

      expect(result).toEqual(expextedState);
    });
  });

  describe('START', () => {
    it('should set the start date and isStarted', () => {
      const result = reducer(initialState, new lesson.StartAction());

      expect(result.isStarted).toBeTruthy();
      expect(result.statistic.startTime).not.toBe(-1);
    });
  });

  describe('END', () => {
    it('should set the end date and isEnded', () => {
      const result = reducer(initialState, new lesson.EndAction());

      expect(result.isEnded).toBeTruthy();
      expect(result.statistic.endTime).not.toBe(-1);
    });
  });

  describe('getLessonTitle', () => {
    it('should return with the lesson title if lesson loaded', () => {
      const state = Object.assign({}, initialState, { currentLesson: { title: 'test' } });


      const result = fromLesson.getLessonTitle(state);

      expect(result).toBe('test');
    });

    it('should return with null if no lesson set', () => {
      const result = fromLesson.getLessonTitle(initialState);

      expect(result).toBeNull();
    });
  });

  describe('getLessonText', () => {
    it('should return with the lesson text if lesson loaded', () => {
      const state = Object.assign({}, initialState, { currentLesson: { text: 'test' } });


      const result = fromLesson.getLessonText(state);

      expect(result).toBe('test');
    });

    it('should return with null if no lesson set', () => {
      const result = fromLesson.getLessonText(initialState);

      expect(result).toBeNull();
    });
  });

  describe('getLessonId', () => {
    it('should return with the lesson id if lesson loaded', () => {
      const state = Object.assign({}, initialState, { currentLesson: { id: 'test' } });


      const result = fromLesson.getLessonId(state);

      expect(result).toBe('test');
    });

    it('should return with null if no lesson set', () => {
      const result = fromLesson.getLessonId(initialState);

      expect(result).toBeNull();
    });
  });

  describe('getLessonDifficulty', () => {
    it('should return with the lesson difficulty if lesson loaded', () => {
      const state = Object.assign({}, initialState, { currentLesson: { difficulty: 1 } });


      const result = fromLesson.getLessonDifficulty(state);

      expect(result).toBe(1);
    });

    it('should return with null if no lesson set', () => {
      const result = fromLesson.getLessonDifficulty(initialState);

      expect(result).toBeNull();
    });
  });

  describe('getCurrentLesson', () => {
    it('should return with the lesson', () => {
      const state = Object.assign({}, initialState, {
        currentLesson: {
          id: 'test', title: 'Test', text: 'test', difficulty: 1
        }
      });

      const result = fromLesson.getCurrentLesson(state);

      expect(result).toEqual({
        id: 'test', title: 'Test', text: 'test', difficulty: 1
      });
    });
  });

  describe('getTypedText', () => {
    it('should return with the typedText', () => {
      const state = Object.assign({}, initialState, {
        typedText: 'test'
      });

      const result = fromLesson.getTypedText(state);

      expect(result).toBe('test');
    });
  });

  describe('isStarted', () => {
    it('should return with isStarted', () => {
      const state = Object.assign({}, initialState, {
        isStarted: true
      });

      const result = fromLesson.isStarted(state);

      expect(result).toBeTruthy();
    });
  });

  describe('isEnded', () => {
    it('should return with isEnded', () => {
      const state = Object.assign({}, initialState, {
        isEnded: true
      });

      const result = fromLesson.isEnded(state);

      expect(result).toBeTruthy();
    });
  });

  describe('wasCompleted', () => {
    it('should return with true if typed text equal lesson text', () => {
      const state = Object.assign({}, initialState, {
        typedText: 'test', currentLesson: { text: 'test' }
      });

      const result = fromLesson.wasCompleted(state);

      expect(result).toBeTruthy();
    });

    it('should return with false if typed text not equal lesson text', () => {
      const state = Object.assign({}, initialState, {
        typedText: 'test', currentLesson: { text: 'te' }
      });

      const result = fromLesson.wasCompleted(state);

      expect(result).toBeFalsy();
    });

    it('should return with false if there is no lesson', () => {
      const state = Object.assign({}, initialState, {
        typedText: 'test'
      });

      const result = fromLesson.wasCompleted(state);

      expect(result).toBeFalsy();
    });
  });

  describe('getStatistic', () => {
    it('should return with a statistic created from data', () => {
      const state = Object.assign({}, initialState, {
        statistic: {
          nofCorrectPress: 1,
          mistakes: {
            e: {
              t: 1
            }
          },
          startTime: 1,
          endTime: 2,
        }
      });

      const result = fromLesson.getStatistic(state);

      expect(result.accuracy).toEqual(0.5);
      expect(result.charPerMinute).toEqual(60000);
    });
  });

  describe('getProgress', () => {
    it('should return with null if there is no lesson', () => {
      const state = Object.assign({}, initialState);

      const result = fromLesson.getProgress(state);

      expect(result).toBeNull();
    });

    it('should return the progress in % calculated from typed text length', () => {
      const state = Object.assign({}, initialState, { typedText: 'te', currentLesson: { text: 'test' } });

      const result = fromLesson.getProgress(state);

      expect(result).toBe(50);
    });
  });

  describe('getProgress', () => {
    it('should return with an array created from players.progress expcept the first entry', () => {
      const state = Object.assign({}, initialState, { players: [{ progress: 1 }, { progress: 2 }] });

      const result = fromLesson.getEnemiesProgress(state);

      expect(result).toEqual([2]);
    });
  });

  describe('isAllPlayerReady', () => {
    it('should return true if all the players are ready', () => {
      const state = Object.assign({}, initialState, { players: [{ state: 'READY' }, { state: 'READY' }] });

      const result = fromLesson.isAllPlayerReady(state);

      expect(result).toBeTruthy();
    });

    it('should return false if there is a player who is not ready', () => {
      const state = Object.assign({}, initialState, { players: [{ state: 'READY' }, { state: 'NOT_READY' }] });

      const result = fromLesson.isAllPlayerReady(state);

      expect(result).toBeFalsy();
    });

    it('should return false if the number of player lower then 2', () => {
      const state = Object.assign({}, initialState, { players: [{ state: 'READY' }] });

      const result = fromLesson.isAllPlayerReady(state);

      expect(result).toBeFalsy();
    });
  });
});
