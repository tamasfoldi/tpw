import * as _ from 'lodash';

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

  getWords(arr: { [key: string]: number }[], totalNumberOfWords = 100) {
    const keys = arr.reduce((p, c) => _.concat(p, _.keys(c))
      , [] as string[]);
    const numberOfWordForKey = arr.map((v, i) => v[keys[i]]).map(v => totalNumberOfWords * (v / 100));
    const joinedKeys = [keys.join('')];
    const differedArraysByKey = keys.reduce((p, c) => {
      p[c] = _.differenceWith(this.WORDS_DB.data[0][c], joinedKeys, this.diff);
      return p;
    }, {});

    let tmp = [];
    keys.forEach((v, i) => {
      if (differedArraysByKey[v].length < numberOfWordForKey[i]) {
        differedArraysByKey[v] = this.fillArray(differedArraysByKey[v], numberOfWordForKey[i]);
      }
      tmp = _.concat(tmp, _.take(_.shuffle(differedArraysByKey[v]), numberOfWordForKey[i]));
    });
    return _.shuffle(tmp);
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
