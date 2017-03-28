import { LESSON_BASE_URL } from '../services/tokens';
import {
  Http, ConnectionBackend, BaseRequestOptions,
  RequestOptionsArgs, Response, ResponseOptions, Request, RequestMethod
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { Observable } from 'rxjs/Rx';
import { Inject, Injectable } from '@angular/core';
import * as mockData from './mock-http-data';
import { LessonListElement } from 'app/models/lessons/lesson-list-element';
import { Lesson } from 'app/models/lessons/lesson';
import * as _ from 'lodash';

interface ParsedWord { [key: string]: string[]; };

@Injectable()
export class MockHttp extends Http {

  obj;
  constructor(
    private backend: ConnectionBackend,
    private defaultOptions: BaseRequestOptions) {
    super(backend, defaultOptions);
    this.obj = _.words('jjjjjjjj jjjj ffffffff ffff dddddddd dddd kkkkkkkk kkkk llllllll llll ssssssss ssss aaaaaaaa aaaa éééééééé éééé')
      .reduce((prev, curr) => _.mergeWith(prev, this.wordParser(curr), this.unionIfArray)
      , {});
  }
  get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    this.backend.createConnection(new Request({ url: url, method: RequestMethod.Get }));
    return Observable.of(true)
      .map(() => {
        let rspData;
        if (url.includes(`/lesson/`)) {
          const id = url.split('/').reverse()[0];
          const mistakes = options ? options.body : null;
          rspData = this.getLessonData(id, mistakes);
        } else if (url.includes(`/lessons`)) {
          rspData = this.getLessons();
        }
        return new Response(new ResponseOptions({ body: rspData }));
      });
  }

  getLessons(): LessonListElement[] {
    return mockData.LESSON_LIST;
  }

  getLessonData(lessonId: string, mistakes?): Lesson {
    const retLesson = mockData.LESSONS
      .find(lesson => lesson.id === lessonId);
    retLesson.text = this.getWords(retLesson.includedLetters, 10).toString().replace(/,/g, ' ');
    return retLesson;
  }


  wordParser(word: string): ParsedWord {
    const object: ParsedWord = {};
    for (let i = 0; i < word.length; i++) {
      if (!object[word[i]]) {
        object[word[i]] = [word];
      }
    }
    return object;
  }

  unionIfArray(objValue, srcValue) {
    if (_.isArray(objValue)) {
      return _.union(objValue, srcValue);
    }
  }


  diff(arr: string, differ: string) {
    for (let i = 0; i < differ.length; i++) {
      arr = arr.replace(new RegExp(differ[i], 'g'), '');
      if (arr.length === 0) {
        break;
      }
    }
    return arr.length !== 0;
  }

  fillArray(value, len) {
    let arr = [];
    for (let i = 0; i < len; i++) {
      arr = arr.concat(value);
    }
    return arr;
  }


  getWords(arr: { [key: string]: number }[], totalNumberOfWords = 100) {
    const keys = arr.reduce((p, c) => _.concat(p, _.keys(c))
      , [] as string[]);
    const numberOfWordForKey = arr.map((v, i) => v[keys[i]]).map(v => totalNumberOfWords * (v / 100));
    const joinedKeys = [keys.join('')];
    const differedArraysByKey = keys.reduce((p, c) => {
      p[c] = _.differenceWith(this.obj[c], joinedKeys, this.diff);
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
}
