import { Statistic } from './statistic';

describe('Statistic', () => {
  describe('hasEnded', () => {
    it('should return true if start and end time >= 0', () => {
      const stat: Statistic = new Statistic({
        nofCorrectPress: 0,
        nofIncorrectPress: 0,
        startTime: 1,
        endTime: 1
      });

      expect(stat.hasEnded).toBeTruthy();
    });

    it('should return true if start <= 0', () => {
      const stat: Statistic = new Statistic({
        nofCorrectPress: 0,
        nofIncorrectPress: 0,
        startTime: -1,
        endTime: 1
      });

      expect(stat.hasEnded).toBeFalsy();
    });

    it('should return true if end <= 0', () => {
      const stat: Statistic = new Statistic({
        nofCorrectPress: 0,
        nofIncorrectPress: 0,
        startTime: 1,
        endTime: -1
      });

      expect(stat.hasEnded).toBeFalsy();
    });
  });

  describe('nofTotalPress', () => {
    it('should return with the sum of correct and incorrect presses', () => {
      const stat: Statistic = new Statistic({
        nofCorrectPress: 1,
        nofIncorrectPress: 1,
        startTime: -1,
        endTime: -1
      });

      expect(stat.nofTotalPress).toBe(2);
    });
  });

  describe('durationInMillis', () => {
    it('should return with -1 if not ended', () => {
      const stat: Statistic = new Statistic({
        nofCorrectPress: 1,
        nofIncorrectPress: 1,
        startTime: -1,
        endTime: -1
      });

      expect(stat.durationInMillis).toBe(-1);
    });

    it('should return with substraction of end and start', () => {
      const stat: Statistic = new Statistic({
        nofCorrectPress: 1,
        nofIncorrectPress: 1,
        startTime: 1,
        endTime: 2
      });

      expect(stat.durationInMillis).toBe(1);
    });
  });

  describe('durationInSecs', () => {
    it('should return with -1 if not ended', () => {
      const stat: Statistic = new Statistic({
        nofCorrectPress: 1,
        nofIncorrectPress: 1,
        startTime: -1,
        endTime: -1
      });

      expect(stat.durationInSecs).toBe(-1);
    });

    it('should return with substraction of end and start /1000', () => {
      const stat: Statistic = new Statistic({
        nofCorrectPress: 1,
        nofIncorrectPress: 1,
        startTime: 1,
        endTime: 2
      });

      expect(stat.durationInSecs).toBe(0.001);
    });
  });

  describe('wordPerMinute', () => {
    it('should return with -1 if not ended', () => {
      const stat: Statistic = new Statistic({
        nofCorrectPress: 1,
        nofIncorrectPress: 1,
        startTime: -1,
        endTime: -1
      });

      expect(stat.wordPerMinute).toBe(-1);
    });

    it('should return with charPerMinute / 5', () => {
      const stat: Statistic = new Statistic({
        nofCorrectPress: 10,
        nofIncorrectPress: 15,
        startTime: 1,
        endTime: 2
      });

      expect(stat.wordPerMinute).toBe(120000);
    });
  });

  describe('accuracy', () => {
    it('should return with correct/total', () => {
      const stat: Statistic = new Statistic({
        nofCorrectPress: 1,
        nofIncorrectPress: 1,
        startTime: -1,
        endTime: -1
      });

      expect(stat.accuracy).toBe(0.5);
    });
  });

  describe('charPerMinute', () => {
    it('should return with -1 if not ended', () => {
      const stat: Statistic = new Statistic({
        nofCorrectPress: 1,
        nofIncorrectPress: 1,
        startTime: -1,
        endTime: -1
      });

      expect(stat.charPerMinute).toBe(-1);
    });

    it('should return with correct / durationInSecs * 60', () => {
      const stat: Statistic = new Statistic({
        nofCorrectPress: 10,
        nofIncorrectPress: 15,
        startTime: 1,
        endTime: 2
      });

      expect(stat.charPerMinute).toBe((10 / stat.durationInSecs) * 60);
    });
  });

});
