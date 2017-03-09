import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { State } from '../reducers/index';
import * as fromRoot from '../reducers/index';

@Injectable()
export class LessonGuard implements CanActivate {
  constructor(private store: Store<State>) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.store.select(fromRoot.getLessonList)
      .select(list => list
        .find(elem => elem.id === next.params['id']))
      .map(elem => elem.isAvailable);
  }
}
