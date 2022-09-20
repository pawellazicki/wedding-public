import { trigger, state, style, transition, animate, keyframes, animateChild, query } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loveline',
  templateUrl: './loveline.component.html',
  styleUrls: ['./loveline.component.scss'],
  animations: [
    trigger('title', [
      state('show', style({
        marginTop: 'calc(2rem + 2vh)',
        opacity: 1
      })),
      transition('* => show', [
        style({ 
          marginTop: '0',
          opacity: 0
        }),
        animate('1.5s 0s ease')
      ]),      
    ]),
    trigger('birds', [
      state('show', style({
        opacity: 1
      })),
      transition('* => show', [
        style({ 
          opacity: 0
        }),
        animate('0.2s 1.7s ease')
      ]),      
    ]),
    trigger('birds-heart', [
      state('show', style({
        opacity: 0
      })),
      transition('* => show', [
        style({ 
          opacity: 0
        }),
        animate('1.5s 1.3s ease', keyframes([
          style({ 
            transform: 'scale(0)', 
            opacity: 1,
            offset: 0 
          }),
          style({ 
            transform: 'scale(7)', 
            opacity: 1,
            offset: 0.5 
          }),
          style({ 
            transform: 'scale(10)',
            opacity: 0,
            offset: 1
          }),
        ])),
      ]),      
    ]),
    trigger('appear', [
      state('show', style({
        marginTop: '0px',
        opacity: 1
      })),
      transition('* => show', [
        style({ 
          marginTop: '20px',
          opacity: 0
        }),
        animate('1.2s {{time}}s ease')
      ], {params: {time: '0'}}),      
    ]),
  ]
})
export class LovelineComponent implements OnInit {

  messages = ['asd','asd1,','asd3','asdasda']
  isLoading = true

  constructor() { }

  ngOnInit(): void {
  }

  setLoader(loading: boolean) {
    this.isLoading = loading
  }
}
