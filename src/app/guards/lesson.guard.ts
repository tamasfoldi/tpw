import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { Store } from '@ngrx/store';
import { State } from '../reducers/index';
import * as fromRoot from '../reducers/index';
import * as lessons from '../actions/lessons.actions';
@Injectable()
export class LessonGuard implements CanActivate {
  constructor(private store: Store<State>, private router: Router) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    return this.store.select(fromRoot.getLessonList)
      .select(list => list
        .find(elem => elem.id === next.params['id']))
      .filter(elem => !!elem)
      .do(a => console.log(a))
      .do(elem => !elem.isAvailable ?
        this.router.navigate(['/']) :
        this.store.dispatch(new lessons.SelectAction(next.params['id'])))
      .map(elem => elem.isAvailable);
  }
}
