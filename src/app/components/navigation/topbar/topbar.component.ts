import { Router } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Subject } from 'rxjs';
import { TopbarButtonType, TopbarService, TopbarRouter, TopbarButton } from './../../../services/topbar.service';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { Output } from '@angular/core';
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import { RouteType } from 'src/app/app-routing.module';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
  animations: [
    trigger('widthUp', [
      state('up', style({
        width: '100%',
      })),
      state('down', style ({
        width: '0px',
      })),
      transition('down <=> up', [
        animate('0.2s')
      ])
    ]),
    trigger('scale', [
      state('up', style({
        transform: 'scale(1.3)',
      })),
      state('down', style ({
        transform: 'scale(1)',
      })),
      transition('down <=> up', [
        animate('0.2s')
      ])
    ]),
  ]
})
export class TopbarComponent implements OnInit {
  RouteType: typeof RouteType = RouteType
  readonly spaceGap = 1

  destroy$ = new Subject()

  // Controls
  isLoading = true
  isDrawer = false
  spaceWidth?: number
  buttonsWidth?: number
  maxButtonsWidth: number = 0
  
  // Data
  email?: string
  
  @Output()
  buttonMenuClick = new EventEmitter()

  @ViewChild('space1')
  space1?: ElementRef
  @ViewChild('space2')
  space2?: ElementRef
  @ViewChild('buttons')
  buttons?: ElementRef

  constructor(
    private topbarService: TopbarService,
    private router: Router
  ) { }

 
  ngOnInit(): void {
    this.topbarService.onRefresh.subscribe(() => {
      this.setLoader(false)
      this.setTopbar()
    })
  }

  setTopbar() {
    this.setElementsWidth()
    this.setTopbarType()
  }

  ngAfterViewInit() {
    this.setTopbar()
  }

  private setElementsWidth() {
    this.spaceWidth = this.space1?.nativeElement.offsetWidth + this.space2?.nativeElement.offsetWidth
    this.buttonsWidth = 
      this.buttons?.nativeElement?.offsetWidth ?
      this.buttons?.nativeElement?.offsetWidth :
      0
    if(this.buttonsWidth != null && this.maxButtonsWidth < this.buttonsWidth) {
      this.maxButtonsWidth = this.buttonsWidth
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next()
  }

  onButtonActionClick(actionType: TopbarButtonType) {
    this.topbarService.buttonActionClick.next(actionType)
  }

  onButtonMenuClick() {
    this.buttonMenuClick.emit('')
  }

  navigate(route: TopbarRouter) {
    this.router.navigateByUrl(route.url);
  }

  setTopbarType() {
    if(this.spaceWidth != null) {
      this.isDrawer = 
        (this.spaceWidth < this.spaceGap) ||
        (!this.buttonsWidth && (this.spaceWidth < this.maxButtonsWidth))
    }
  }

  onOver(route: TopbarRouter) {
    route.hover = !route.hover
  }

  // Getters
  get buttonList(): TopbarButton[] {
    return this.topbarService.buttonList
  }

  get routeList(): TopbarRouter[] {
    return this.topbarService.routeList
  }
  
  get selectedRouteButton(): TopbarRouter | undefined {
    return this.topbarService.selectedRoute
  }

  // UTIL
  private setLoader(loading: boolean) {
    this.isLoading = loading
  }
}
