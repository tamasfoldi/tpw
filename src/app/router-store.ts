import { Injectable, ModuleWithProviders, NgModule, Optional } from '@angular/core';
import {
  ActivatedRouteSnapshot, CanActivateChild, RouterModule, RouterStateSnapshot,
  Routes, Router, NavigationCancel, RoutesRecognized, NavigationError
} from '@angular/router';
import { Store, StoreModule, provideStore } from '@ngrx/store';

import * as router from './actions/router.actions';

/**
 * Used to intercept all navigations to dispatch actions.
 *
 * @internal
 */
@Injectable()
export class CanActivateChildInterceptor implements CanActivateChild {
  private routerState: RouterStateSnapshot = null;
  private storeState: any;
  private lastRoutesRecognized: RoutesRecognized;

  constructor( @Optional() private store: Store<any>, private router: Router) {
    if (!store) {
      throw new Error('RouterConnectedToStoreModule can only be used in combination with StoreModule');
    }
    this.setUpStateRollbackEvents();
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.routerState !== state) {
      this.routerState = state;

      const payload = { routerState: state, event: this.lastRoutesRecognized };
      this.store.dispatch({ type: router.ActionTypes.NAVIGATION, payload });
    }
    return true;
  }

  private setUpStateRollbackEvents(): void {
    this.store.subscribe(s => {
      this.storeState = s;
    });

    this.router.events.subscribe(e => {
      if (e instanceof RoutesRecognized) {
        this.lastRoutesRecognized = e;
      } else if (e instanceof NavigationCancel) {
        this.dispatchRouterCancel(e);
      } else if (e instanceof NavigationError) {
        this.dispatchRouterError(e);
      }
    });
  }

  private dispatchRouterCancel(event: NavigationCancel): void {
    const payload = { routerState: this.routerState, storeState: this.storeState, event };
    this.store.dispatch({ type: router.ActionTypes.CANCEL, payload });
  }

  private dispatchRouterError(event: NavigationError): void {
    const payload = { routerState: this.routerState, storeState: this.storeState, event };
    this.store.dispatch({ type: router.ActionTypes.ERROR, payload });
  }
}

/**
 * Wraps the router configuration to make StoreConnectedToRouter work.
 *
 * See StoreConnectedToRouter for more information.
 */
export function connectToStore(routes: Routes): Routes {
  return [{ path: '', canActivateChild: [CanActivateChildInterceptor], children: routes }];
}

/**
 * Sets up StoreModule and wires it up to the router.
 *
 * It has to be used in combination with connectToStore.
 *
 * Usage:
 *
 * ```typescript
 * @NgModule({
 *   declarations: [AppCmp, SimpleCmp],
 *   imports: [
 *     BrowserModule,
 *     RouterModule.forRoot(connectToStore([
 *       { path: '', component: SimpleCmp },
 *       { path: 'next', component: SimpleCmp }
 *     ])),
 *     StoreConnectedToRouter.provideStore(mapOfReducers)
 *   ],
 *   bootstrap: [AppCmp]
 * })
 * export class AppModule {
 * }
 * ```
 */
@NgModule({})
export class StoreConnectedToRouter {
  static provideStore(_reducer: any, _initialState?: any): ModuleWithProviders {
    return {
      ngModule: StoreModule,
      providers: [...provideStore(_reducer, _initialState), CanActivateChildInterceptor]
    };
  }
}
