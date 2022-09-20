import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-image-background',
  templateUrl: './image-background.component.html',
  styleUrls: ['./image-background.component.scss'],
  animations: [
    trigger('appear', [
      state('visible', style({
        opacity: 0.8,
      })),
      transition('* => visible', [
        style({opacity: 0}),
        animate('2s 0s', keyframes ( [
          style({ opacity: 0, offset: 0}),
          style({ opacity: 1, offset: 0.8}),
          style({ opacity: 0.9, offset: 1}),
        ]))
      ]),      
    ]),
  ]
})
export class ImageBackgroundComponent implements OnInit {
  isLoading = true

  @Input()
  imageUrl = ''
  @Output()
  isLoaded = new EventEmitter<boolean>()

  constructor() { }

  ngOnInit(): void { }

  setLoader(loading: boolean) {
    this.isLoading = loading
  }

  isImageLoaded() {
    this.setLoader(false)
    this.isLoaded.emit()
  }
}
