import { animate, animateChild, keyframes, query, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('goUp1', [
      state('up', style({
        marginBottom: '30px',
        opacity: 1
      })),
      transition('* => up', [
        style({ 
          marginBottom: '0px',
          opacity: 0
        }),
        animate('2s 0s', keyframes ( [
          style({ marginBottom: '0px', opacity: 0, offset: 0}),
          style({ marginBottom: '100px', opacity: 0.5, offset: 0.85}),
          style({ marginBottom: '30px', opacity: 1, offset: 1}),
        ]))
      ]),      
    ]),
    trigger('goUp2', [
      state('up', style({
        marginBottom: '30px',
        opacity: 1
      })),
      transition('* => up', [
        style({ marginBottom: '0px', opacity: 0}),
        animate('2s 0s', keyframes ( [
          style({ marginBottom: '0px', opacity: 0, offset: 0}),
          style({ marginBottom: '50px', opacity: 0, offset: 0.85}),
          style({ marginBottom: '30px', opacity: 1, offset: 1}),
        ])),
        query('@*', animateChild())
      ]),      
    ]),
    trigger('appear1', [
      state('visible', style({
        opacity: 1,
      })),
      transition('* => visible', [
        style({opacity: 0}),
        animate('1s 2s ease'),
        query('@*', animateChild())
      ]),      
    ]),
    trigger('circle1', [
      state('visible', style({
        opacity: 1, borderColor: '#436cff', color: 'white'
      })),
      transition('* => visible', [
        style({ opacity: 0, borderColor: 'transparent' }),
        animate('0.6s 2s', keyframes ( [
          style({ opacity: 0, offset: 0 }),
          style({ opacity: 1, transform: 'translateY(-20%)', borderColor: '#436cff', offset: 0.7 }),
          style({ color: 'white', transform: 'translateY(0)', offset: 1 }),
        ]))
      ]),      
    ]),
    trigger('circle2', [
      state('visible', style({
        opacity: 1, borderColor: '#436cff', color: 'white'
      })),
      transition('* => visible', [
        style({ opacity: 0, borderColor: 'transparent' }),
        animate('0.6s 2.2s', keyframes ( [
          style({ opacity: 0, offset: 0 }),
          style({ opacity: 1, transform: 'translateY(-20%)', borderColor: '#436cff', offset: 0.7 }),
          style({ color: 'white', transform: 'translateY(0)', offset: 1 }),
        ]))
      ]),      
    ]),
    trigger('circle3', [
      state('visible', style({
        opacity: 1, borderColor: '#436cff', color: 'white'
      })),
      transition('* => visible', [
        style({ opacity: 0, borderColor: 'transparent' }),
        animate('0.6s 2.4s', keyframes ( [
          style({ opacity: 0, offset: 0 }),
          style({ opacity: 1, transform: 'translateY(-20%)', borderColor: '#436cff', offset: 0.7 }),
          style({ color: 'white', transform: 'translateY(0)', offset: 1 }),
        ]))
      ]),      
    ]),
    trigger('circle4', [
      state('visible', style({
        opacity: 1, borderColor: '#436cff', color: 'white'
      })),
      transition('* => visible', [
        style({ opacity: 0, borderColor: 'transparent' }),
        animate('0.6s 2.6s', keyframes ( [
          style({ opacity: 0, offset: 0 }),
          style({ opacity: 1, transform: 'translateY(-20%)', borderColor: '#436cff', offset: 0.7 }),
          style({ color: 'white', transform: 'translateY(0)', offset: 1 }),
        ]))
      ]),      
    ]),
    trigger('numberAppear', [
      state('visible', style({
        opacity: 1
      })),
      transition('* => visible', [
        style({ opacity: 0 }),
        animate('0.5s 3s', style({
          opacity: 1
        }))
      ]),      
    ]),
    trigger('scaleUp1', [
      state('up', style({
        transform: 'scale(1)',
      })),
      transition('* => up', [
        style({ 
          transform: 'scale(1)',
        }),
        animate('0.5s 1s ease', keyframes([
          style({ 
            transform: 'scale(1)', 
            offset: 0 
          }),
          style({ 
            transform: 'scale(1.5)', 
            offset: 0.5 
          }),
          style({ 
            transform: 'scale(1)', 
            offset: 1
          }),
        ]))
      ]),      
    ]),
    trigger('toLeft', [
      state('left', style({
        transform: 'translateX(0px)',
        opacity: 1
      })),
      transition('* => left', [
        style({ 
          transform: 'translateX(20px)',
          opacity: 0
        }),
        animate('1s 0.2s ease')
      ]),      
    ]),
    trigger('toRight', [
      state('right', style({
        transform: 'translateX(0px)',
        opacity: 1
      })),
      transition('* => right', [
        style({ 
          transform: 'translateX(-20px)',
          opacity: 0
        }),
        animate('1s 0.2s ease')
      ]),      
    ]),
  ]
})
export class HomeComponent implements OnInit {
  date = new Date()
  weddingDate = new Date()
  timeDiff: number = 0

  days: number = 0
  hours: number = 0
  minutes: number = 0
  seconds: number = 0

  isLoading = true

  constructor() {}

  ngOnInit(): void {
    this.setWeddingDate()
    this.setCountdown()
  }

  private setCountdown() {
    interval(1000).subscribe(() => {
      this.updateTimeValues()
    })
  }

  private setWeddingDate() {
    this.weddingDate.setFullYear(2022,7,20)
    this.weddingDate.setHours(16,0,0,0)
  }

  private updateTimeValues() {
    this.date = new Date()
    this.timeDiff = this.weddingDate.getTime() - this.date.getTime();
    this.days = this.timeDiff > 0 ? this._days : 0
    this.hours = this.timeDiff > 0 ? this._hours : 0
    this.minutes = this.timeDiff > 0 ? this._minutes : 0
    this.seconds = this.timeDiff > 0 ? this._seconds : 0
  }

  private get _days(){
    const diff = this.timeDiff / (1000 * 3600 * 24);
    return Math.floor(diff);
  }

  private get _hours(){
    const hours = this.timeDiff / (1000 * 3600) - this.days*24; 
    return Math.floor(hours);
  }
  
  private get _minutes(){
    const hours = this.timeDiff / (1000 * 60) % 60;
    return Math.floor(hours);
  }
  
  private get _seconds(){
    const hours = this.timeDiff / (1000) % 60;
    return Math.floor(hours);
  }

  setLoader(loading: boolean) {
    this.isLoading = loading
  }
}
