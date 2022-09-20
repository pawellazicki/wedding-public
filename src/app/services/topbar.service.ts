import { first } from 'rxjs/operators';
import { Router, NavigationEnd } from '@angular/router';
import { Injectable } from '@angular/core';
import { Subject, Observable, ReplaySubject } from 'rxjs';
import { RouteType } from '../app-routing.module';

export enum TopbarButtonType {
  LOGOUT,
  PROFILE,
  HOME,
  LOGIN
}

export interface TopbarRouter {
  url: RouteType
  visible: boolean
  hover: boolean
  selected?: boolean
  icon?: string
  width?: number
  text?: string
}

export interface TopbarButton {
  type: TopbarButtonType
  icon: string
  url: string
  label: string
  visible: boolean
}

@Injectable({
  providedIn: 'root'
})
export class TopbarService {
  selectedRoute?: TopbarRouter

  buttonActionClick = new Subject<TopbarButtonType>()
  RouterClick = new Subject<TopbarRouter>()

  private _topbarButtonList: TopbarButton[] = [] 
  private _topbarRouterList: TopbarRouter[] = [] 
  private _refreshTopbar = new ReplaySubject()

  private _emailObserver = new Subject<string>()

  constructor(
    private router: Router
  ) { 
    this.initTopbarRoutes()
    // this.initTopbarButtons()
    // this.setTopbarVisibility()
    this.onRouteChange()
  }

  // INITS
  private initTopbarButtons() {
    this._topbarButtonList.push({
      type: TopbarButtonType.PROFILE,
      icon: 'account_circle',
      label: 'Profile',
      url: '',
      visible: false
    })
    this._topbarButtonList.push({
      type: TopbarButtonType.LOGOUT,
      icon: 'logout',
      label: 'Logout',
      url: '',
      visible: false
    })
    this._topbarButtonList.push({
      type: TopbarButtonType.LOGIN,
      icon: 'login',
      label: 'login',
      url: '/login',
      visible: false
    })
  }

  private initTopbarRoutes() {
    this._topbarRouterList.push({
      url: RouteType.HOME,
      visible: true,
      hover: false,
      icon: 'bi-house'
    })
    this._topbarRouterList.push({
      url: RouteType.WEDDING,
      visible: true,
      hover: false,
      icon: 'bi-calendar-heart'
    })
    this._topbarRouterList.push({
      url: RouteType.GALLERY,
      visible: true,
      hover: false,
      icon: 'bi-camera'
    })
    this._topbarRouterList.push({
      url: RouteType.LOVELINE,
      visible: true,
      hover: false,
      icon: 'bi-people-fill'
    })
    this._topbarRouterList.push({
      url: RouteType.BOOK,
      visible: true,
      hover: false,
      icon: 'bi-book'
    })

    this._refreshTopbar.next()
  }

  // VISIBILITY
  setButtonVisible(topbarButtonType: TopbarButtonType, visibility: boolean) {
    this._topbarButtonList.find(button => button.type === topbarButtonType)!.visible = visibility
  }

  setRouterVisible(routeType: RouteType, visibility: boolean) {
    this._topbarRouterList.find(route => route.url === routeType)!.visible = visibility
  }

  setRoutesVisibility(visibility: boolean) {
    this._topbarRouterList.forEach(route => route.visible = visibility)
  }
  
  setButtonsVisibility(visibility: boolean) {
    this._topbarButtonList.forEach(route => route.visible = visibility)
  }

  // setRoutesVisibilityForUser() {
  //   this.userService.getCurrentUserData()
  //   .pipe(first()).subscribe(user => {
  //     this._emailObserver.next(user.email)
  //     switch (user.accountType) {
  //       case AccountType.ADMIN:
  //         this.setRouterVisible(RouteType.WEEK, false)
  //         this.setRouterVisible(RouteType.APPOINTMENTS, true)
  //         this.setRouterVisible(RouteType.DOCTORS, true)
  //         this.setRouterVisible(RouteType.PATIENTS, true)
  //         this.setRouterVisible(RouteType.WORKING_HOURS, false)
  //         this.setRouterVisible(RouteType.RECEPTIONISTS, true)
  //         this.setRouterVisible(RouteType.ADMINS, true)
  //         this.setRouterVisible(RouteType.STATISTICIANS, true)
  //         this.setRouterVisible(RouteType.STATISTICS, true)
  //         break;
  //       case AccountType.DOCTOR:
  //         this.setRouterVisible(RouteType.WEEK, true)
  //         this.setRouterVisible(RouteType.APPOINTMENTS, true)
  //         this.setRouterVisible(RouteType.DOCTORS, true)
  //         this.setRouterVisible(RouteType.PATIENTS, true)
  //         this.setRouterVisible(RouteType.WORKING_HOURS, true)
  //         this.setRouterVisible(RouteType.RECEPTIONISTS, true)
  //         this.setRouterVisible(RouteType.STATISTICIANS, false)
  //         this.setRouterVisible(RouteType.STATISTICS, false)
  //         this.setRouterVisible(RouteType.ADMINS, false)
  //         break;
  //       case AccountType.RECEPTIONIST:
  //         this.setRouterVisible(RouteType.WEEK, false)
  //         this.setRouterVisible(RouteType.APPOINTMENTS, true)
  //         this.setRouterVisible(RouteType.DOCTORS, true)
  //         this.setRouterVisible(RouteType.PATIENTS, true)
  //         this.setRouterVisible(RouteType.WORKING_HOURS, false)
  //         this.setRouterVisible(RouteType.RECEPTIONISTS, true)
  //         this.setRouterVisible(RouteType.STATISTICIANS, true)
  //         this.setRouterVisible(RouteType.STATISTICS, false)
  //         this.setRouterVisible(RouteType.ADMINS, false)
  //         break;
  //       case AccountType.PATIENT:
  //         this.setRouterVisible(RouteType.WEEK, false)
  //         this.setRouterVisible(RouteType.APPOINTMENTS, true)
  //         this.setRouterVisible(RouteType.DOCTORS, true)
  //         this.setRouterVisible(RouteType.PATIENTS, false)
  //         this.setRouterVisible(RouteType.WORKING_HOURS, false)
  //         this.setRouterVisible(RouteType.RECEPTIONISTS, false)
  //         this.setRouterVisible(RouteType.STATISTICIANS, false)
  //         this.setRouterVisible(RouteType.STATISTICS, false)
  //         this.setRouterVisible(RouteType.ADMINS, false)
  //         break;
  //       case AccountType.STATISTICIAN:
  //         this.setRouterVisible(RouteType.WEEK, false)
  //         this.setRouterVisible(RouteType.APPOINTMENTS, false)
  //         this.setRouterVisible(RouteType.DOCTORS, false)
  //         this.setRouterVisible(RouteType.PATIENTS, false)
  //         this.setRouterVisible(RouteType.WORKING_HOURS, false)
  //         this.setRouterVisible(RouteType.RECEPTIONISTS, false)
  //         this.setRouterVisible(RouteType.STATISTICIANS, false)
  //         this.setRouterVisible(RouteType.STATISTICS, true)
  //         this.setRouterVisible(RouteType.ADMINS, false)
  //         break;  
  //     }
  //     this._refreshTopbar.next()
  //   })
  // }

  // private setTopbarVisibility() {
  //   this.authService.isUserLoggedIn()
  //     .subscribe(isLogged => {
  //       isLogged ?
  //         this.handleLogged() :
  //         this.handleNotLogged()
  //     })
  // }

  // LOGGED
  // private handleLogged() {
  //   this.setRoutesVisibilityForUser()
  //   this.setButtonVisible(TopbarButtonType.PROFILE, true)
  //   this.setButtonVisible(TopbarButtonType.LOGOUT, true)
  //   this.setButtonVisible(TopbarButtonType.LOGIN, false)
  //   this._refreshTopbar.next()
  // }

  // private handleNotLogged() {
  //   this._emailObserver.next(undefined)
  //   this.setButtonsVisibility(false)
  //   this.setButtonVisible(TopbarButtonType.LOGIN, true)
  //   this.setRoutesVisibility(false)
  //   this.setRouterVisible(RouteType.DOCTORS, true)
  //   this._refreshTopbar.next()
  // }

  // GETTERS
  get buttonList(): TopbarButton[] {
    return [...this._topbarButtonList]
  }
  get routeList(): TopbarRouter[] {
    return [...this._topbarRouterList]
  }

  get userEmailObserver(): Observable<string> {
    return this._emailObserver.asObservable()
  }

  get onRefresh(): Observable<unknown> {
    return this._refreshTopbar.asObservable()
  }

  // OBSERVERS
  private onRouteChange() {
    this.router.events.subscribe(val => {
      if(val instanceof NavigationEnd) {
        this.routeList.forEach(route => route.selected = false)
        const route =   this.routeList.find(route => route.url === val.url.replace('/','') || route.url === val.urlAfterRedirects.replace('/',''))
        if(route) {
          route.selected = true
        }
      }
    })
  }
}
