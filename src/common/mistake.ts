import * as _ from 'lodash';

export interface TypedMistakeCount {
  [replacerChar: string]: number;
}

export class Mistakes {
  [replacedChar: string]: TypedMistakeCount;

  static add(value1: Mistakes, value2: Mistakes): Mistakes {
    return _.mergeWith(value1, value2, (val1, val2) =>
      _.mergeWith(val1, val2, (v1, v2) =>
        _.isUndefined(v1) ? v2 : v1 + v2));
  }
};
