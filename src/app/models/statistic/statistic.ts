import { Mistakes } from './mistake';
export interface StatisticData {
  nofCorrectPress: number;
  startTime: number;
  endTime: number;
  mistakes: Mistakes;
}
export class Statistic implements StatisticData {
  mistakes: Mistakes;
  nofCorrectPress: number;
  startTime: number;
  endTime: number;

  get nofIncorrectPress(): number {
    return this.getIncorrectPressesFromMistakes(this.mistakes);
  }
  get hasEnded(): boolean {
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

  get accuracy(): number {
    return this.nofCorrectPress / this.nofTotalPress;
  }

  get charPerMinute(): number {
    return this.hasEnded ? (this.nofCorrectPress / this.durationInSecs) * 60 : -1;
  }

  constructor(statisticData?: StatisticData) {
    this.nofCorrectPress = statisticData && statisticData.nofCorrectPress || 0;
    this.startTime = statisticData && statisticData.startTime || -1;
    this.endTime = statisticData && statisticData.endTime || -1;
    this.mistakes = statisticData && statisticData.mistakes || {};
  }

  private getIncorrectPressesFromMistakes(mistakes: Mistakes): number {
    return Object.getOwnPropertyNames(mistakes)
      .reduce((totalSumOfMistakes, replacedChar) => totalSumOfMistakes + Object.getOwnPropertyNames(mistakes[replacedChar])
        .reduce((totalSumOfMistakesForOneChar, replacerChar) => totalSumOfMistakesForOneChar + mistakes[replacedChar][replacerChar],
        0),
      0);
  }

}
