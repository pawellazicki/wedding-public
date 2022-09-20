import { trigger, style, state, transition, animate, keyframes } from '@angular/animations';
import { Component, Inject, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Photo } from '../gallery.component';

export interface DialogData {
  selectedPhoto: Photo,
  photos: Photo[]
}

@Component({
  selector: 'app-gallery-dialog',
  templateUrl: './gallery-dialog.component.html',
  styleUrls: ['./gallery-dialog.component.scss'],
  animations: [
    trigger('appear', [
      state('show1', style({
        transform: 'translateX(0)'
      })),
      state('show2', style({
        transform: 'translateX(0)'
      })),
      transition('show1 <=> show2', [
        style({ 
          transform: 'translateX(0)'
        }),
        animate('1.5s 0s ease', keyframes([
          style({ transform: 'translateX(0)', offset: 0}),
          style({ transform: 'translateX(-100%)', offset: 0.5}),
          style({ transform: 'translateX(0)', offset: 1}),
        ]))
      ])     
    ]),
  ]
})
export class GalleryDialogComponent implements OnInit {

  currentPhoto?: Photo
  animState = 'show1'

  constructor(
    public dialogRef: MatDialogRef<GalleryDialogComponent>,
    
      @Inject(MAT_DIALOG_DATA) 
      public data: DialogData,
    ) { }

  ngOnInit(): void {
    this.currentPhoto = this.data.selectedPhoto
  }

  previousPhoto() {
    this.animState === 'show1' ?
      this.animState = 'show2' :
      this.animState = 'show1'
   
    const index = this.data.photos.indexOf(this.currentPhoto!!)

    if(index > 0) {
      this.currentPhoto = this.data.photos[index-1]
    }
  }

  nextPhoto() {
    this.animState === 'show1' ?
      this.animState = 'show2' :
      this.animState = 'show1'

    const index = this.data.photos.indexOf(this.currentPhoto!!)

    if(index < this.data.photos.length - 1) {
      this.currentPhoto = this.data.photos[index+1]
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}
