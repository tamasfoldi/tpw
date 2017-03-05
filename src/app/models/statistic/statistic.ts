export class Statistic {
  nofCorrectPress = 0;
  nofIncorrectPress = 0;
  startTime = 0;
  endTime = 0;

  get nofTotalPress(): number {
    return this.nofCorrectPress + this.nofIncorrectPress;
  }
  get durationInMillis(): number {
    return this.endTime - this.startTime;
  };

  get durationInSecs(): number {
    return this.durationInMillis / 1000;
  }

  get wordPerMinute(): number {
    return this.charPerMinute / 5;
  }

  get charPerMinute(): number {
    return (this.nofCorrectPress / this.durationInSecs) * (60 / this.durationInSecs);
  }

  constructor() {
    this.nofCorrectPress = 0;
    this.nofIncorrectPress = 0;
    this.startTime = 0;
    this.endTime = 0;
  }

}
