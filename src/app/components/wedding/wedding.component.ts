import { trigger, state, style, transition, animate, keyframes, animateChild, query } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wedding',
  templateUrl: './wedding.component.html',
  styleUrls: ['./wedding.component.scss'],
  animations: [
    trigger('wedding', [
      state('up', style({
        marginTop: 'calc(4rem + 5vh)',
        opacity: 1
      })),
      transition('* => up', [
        style({ 
          marginTop: 'calc(1rem + 5vh)',
          opacity: 0
        }),
        animate('1.5s 0s ease')
      ]),      
    ]),
    trigger('toLeft', [
      state('left', style({
        transform: 'translateX(0px)',
        opacity: 1
      })),
      transition('* => left', [
        style({ 
          transform: 'translateX(-20px)',
          opacity: 0
        }),
        animate('1s 1.7s ease')
      ]),      
    ]),
    trigger('toRight', [
      state('right', style({
        transform: 'translateX(0px)',
        opacity: 1
      })),
      transition('* => right', [
        style({ 
          transform: 'translateX(20px)',
          opacity: 0
        }),
        animate('1s 1.7s ease')
      ]),      
    ]),
    trigger('scaleUp1', [
      state('up', style({
        transform: 'scale(1)',
      })),
      transition('* => up', [
        style({ 
          transform: 'scale(0)',
        }),
        animate('1.5s 0.5s ease')
      ]),      
    ]),
    trigger('scaleUp2', [
      state('up', style({
        transform: 'scale(1)',
      })),
      transition('* => up', [
        style({ 
          transform: 'scale(0)',
        }),
        animate('1.5s 1s ease')
      ]),      
    ]),
    trigger('scaleUp3', [
      state('up', style({
        transform: 'scale(1)',
      })),
      transition('* => up', [
        style({ 
          transform: 'scale(0)',
        }),
        animate('1s 3s ease')
      ]),      
    ]),
    trigger('opacity1', [
      state('up', style({
        opacity: 1
      })),
      transition('* => up', [
        style({ 
          opacity: 0
        }),
        animate('2s 2.5s ease'),
      ]),      
    ]),
    trigger('opacity2', [
      state('up', style({
        opacity: 1
      })),
      transition('* => up', [
        style({ 
          opacity: 0
        }),
        animate('1.5s 0s ease')
      ]),      
    ]),
  ]
})
export class WeddingComponent implements OnInit {

  isLoading = true
  constructor() { }

  ngOnInit(): void {
  }

  setLoader($event: boolean) {
    this.isLoading = $event
  }
}
