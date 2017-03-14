import { Injectable, ModuleWithProviders, NgModule, Optional } from '@angular/core';
import {
  ActivatedRouteSnapshot, CanActivateChild, ExtraOptions, RouterModule, RouterStateSnapshot,
  Routes, Router, NavigationCancel, RoutesRecognized, NavigationError
} from '@angular/router';
import { Store, StoreModule, provideStore } from '@ngrx/store';
import { of } from 'rxjs/observable/of';

import * as router from './actions/router.actions';

/**
 * Connects RouterModule with StoreModule.
 *
 * During the navigation, before any guards or resolvers run, the router will dispatch
 * a ROUTER_NAVIGATION action, which has the following signature:
 *
 * ```
 * export type RouterNavigationPayload = {
 *   routerState: RouterStateSnapshot,
 *   event: RoutesRecognized
 * }
 * ```
 *
 * Either a reducer or an effect can be invoked in response to this action.
 * If the invoked reducer throws, the navigation will be canceled.
 *
 * If navigation gets canceled because of a guard, a ROUTER_CANCEL action will be
 * dispatched. If navigation results in an error, a ROUTER_ERROR action will be dispatched.
 *
 * Both ROUTER_CANCEL and ROUTER_ERROR contain the store state before the navigation
 * which can be used to restore the consistency of the store.
 *
 * Usage:
 *
 * ```typescript
 * @NgModule({
 *   declarations: [AppCmp, SimpleCmp],
 *   imports: [
 *     BrowserModule,
 *     StoreModule.provideStore(mapOfReducerse),
 *     RouterModule.forRoot([
 *       { path: '', component: SimpleCmp },
 *       { path: 'next', component: SimpleCmp }
 *     ]),
 *     StoreRouterConnectingModule
 *   ],
 *   bootstrap: [AppCmp]
 * })
 * export class AppModule {
 * }
 * ```
 */
@NgModule({})
export class StoreRouterConnectingModule {
  private routerState: RouterStateSnapshot = null;
  private storeState: any;
  private lastRoutesRecognized: RoutesRecognized;

  constructor(private store: Store<any>, private router: Router) {
    this.setUpBeforePreactivationHook();
    this.setUpStoreStateListener();
    this.setUpStateRollbackEvents();
  }

  private setUpBeforePreactivationHook(): void {
    (<any>this.router).hooks.beforePreactivation = (routerState: RouterStateSnapshot) => {
      this.routerState = routerState;

      const payload = { routerState, event: this.lastRoutesRecognized };
      this.store.dispatch({ type: router.ActionTypes.NAVIGATION, payload });

      return of(true);
    };
  }

  private setUpStoreStateListener(): void {
    this.store.subscribe(s => {
      this.storeState = s;
    });
  }

  private setUpStateRollbackEvents(): void {
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
