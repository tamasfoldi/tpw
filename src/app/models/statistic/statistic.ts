export interface StatisticData {
  nofCorrectPress: number;
  nofIncorrectPress: number;
  startTime: number;
  endTime: number;
}
export class Statistic implements StatisticData {
  nofCorrectPress: number;
  nofIncorrectPress: number;
  startTime: number;
  endTime: number;

  get hasEnded() {
    return this.startTime >= 0 && this.endTime >= 0;
  }
  get nofTotalPress(): number {
    return this.nofCorrectPress + this.nofIncorrectPress;
  }
  get durationInMillis(): number {
    return this.hasEnded ? this.endTime - this.startTime : -1;
  };

  get durationInSecs(): number {
    return this.hasEnded ? this.durationInMillis / 1000 : -1;
  }

  get wordPerMinute(): number {
    return this.hasEnded ? this.charPerMinute / 5 : -1;
  }

  get charPerMinute(): number {
    return this.hasEnded ? (this.nofCorrectPress / this.durationInSecs) * 60 : -1;
  }

  constructor(statisticData?: StatisticData) {
    this.nofCorrectPress = statisticData && statisticData.nofCorrectPress || 0;
    this.nofIncorrectPress = statisticData && statisticData.nofIncorrectPress || 0;
    this.startTime = statisticData && statisticData.startTime || -1;
    this.endTime = statisticData && statisticData.endTime || -1;
  }

}
