import * as _ from 'lodash';
import { SINGLETON as StatisticDAO } from '../statistic/statistic.dao';
import { Mistakes } from '../../common/mistake';
import { StatisticData } from '../../common/statistic';

class WordsDAO {
  private WORDS_DB: LokiCollection<{}>;

  configure(DB: Loki) {
    const instance = this;
    DB.loadDatabase({}, () => {
      instance.WORDS_DB = DB.getCollection('words');
      if (!instance.WORDS_DB) {
        instance.WORDS_DB = DB.addCollection('words');
        instance.WORDS_DB.insert(_.words(`jjjjjjjj jjjj ffffffff ffff
        dddddddd dddd kkkkkkkk kkkk llllllll llll ssssssss ssss aaaaaaaa aaaa éééééééé éééé`)
          .reduce((prev, curr) => _.mergeWith(prev, this.wordParser(curr), this.unionIfArray)
          , {}));
      }
    });
  }

  getAll() {
    return this.WORDS_DB.data;
  }

  getWordsForLetters(weightedLetters: { [key: string]: number }, totalNumberOfWords = 100) {
    const requestedLetters = Object.keys(weightedLetters);
    const joinedLetters = [requestedLetters.join('')];
    const correctionObejctBasedOnStats = _.pick(this.getCorrectionObject(), requestedLetters);
    const differedArraysByKey = requestedLetters.reduce((p, c) => {
      p[c] = _.differenceWith(this.WORDS_DB.data[0][c], joinedLetters, this.diff);
      return p;
    }, {});

    weightedLetters = this.correctWeightedLetters(weightedLetters, correctionObejctBasedOnStats);

    const numberOfWordsForLetters = _.mapValues(weightedLetters, (o) =>
      totalNumberOfWords * (o / 100) >= 1 ? totalNumberOfWords * (o / 100) : 1);


    const requestedWords = requestedLetters.reduce((prev, curr) => {
      if (differedArraysByKey[curr].length < numberOfWordsForLetters[curr]) {
        differedArraysByKey[curr] = this.fillArray(differedArraysByKey[curr], numberOfWordsForLetters[curr]);
      }
      return _.concat(prev, _.take(_.shuffle(differedArraysByKey[curr]), numberOfWordsForLetters[curr]));
    }, []);

    return _.shuffle(requestedWords);
  }

  private correctWeightedLetters(weightedLetters, correctionObject) {
    const maxFailCount = Object.keys(correctionObject)
      .reduce((prev, curr) => prev >= correctionObject[curr] ? prev : correctionObject[curr], 0);
    correctionObject = _.mapValues(correctionObject, o => (100 / maxFailCount) * o);
    return _.mergeWith(weightedLetters, correctionObject, (objValue, sourceValue) =>
      objValue * 0.5 + sourceValue * 0.5);
  }

  private getCorrectionObject() {
    const mistakes = this.getSummarizedMistakes();
    return this.calculateCorrectionObject(mistakes);
  }

  private getSummarizedMistakes() {
    return StatisticDAO.getAll()
      .reverse()
      .slice(0, 10)
      .map((item: StatisticData) => item.mistakes)
      .reduce((prev, curr) => Mistakes.add(prev, curr), {});
  }

  private calculateCorrectionObject(mistakes: Mistakes): { [key: string]: number } {
    const ret = {};
    Object.keys(mistakes).forEach(key => {
      ret[key] = Object.keys(mistakes[key]).reduce((p, c) => {
        return p + mistakes[key][c];
      }, 0);
    });
    return ret;
  }

  private diff(arr: string, differ: string) {
    for (let i = 0; i < differ.length; i++) {
      arr = arr.replace(new RegExp(differ[i], 'g'), '');
      if (arr.length === 0) {
        break;
      }
    }
    return arr.length !== 0;
  }

  private fillArray(value, len) {
    let arr = [];
    for (let i = 0; i < len; i++) {
      arr = arr.concat(value);
    }
    return arr;
  }

  private wordParser(word: string) {
    const object = {};
    for (let i = 0; i < word.length; i++) {
      if (!object[word[i]]) {
        object[word[i]] = [word];
      }
    }
    return object;
  }

  private unionIfArray(objValue, srcValue) {
    if (_.isArray(objValue)) {
      return _.union(objValue, srcValue);
    }
  }
}

export const SINGLETON: WordsDAO = new WordsDAO();
