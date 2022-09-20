import { Router } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { TopbarRouter, TopbarService } from 'src/app/services/topbar.service';
import { Component, OnInit, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  animations: [
    trigger('heightUp', [
      state('up', style({
        height: '100%',
      })),
      state('down', style ({
        height: '0px',
      })),
      transition('down <=> up', [
        animate('0.2s')
      ])
    ]),
    trigger('scale', [
      state('up', style({
        transform: 'scale(1.5)',
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
export class SidenavComponent implements OnInit {
  @Output()
  routeClick = new EventEmitter()
  
  constructor(
    private topbarService: TopbarService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.topbarService.onRefresh.subscribe(() => {
      this.cdr.detectChanges()
    })
  }

  navigate(route: TopbarRouter) {
    this.router.navigateByUrl(route.url);
  }

  get selectedRouteButton(): TopbarRouter | undefined {
    return this.topbarService.selectedRoute
  }

  get routeList(): TopbarRouter[] {
    return this.topbarService.routeList
  }
}
