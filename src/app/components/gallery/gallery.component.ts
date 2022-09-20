import { GalleryDialogComponent, DialogData } from './gallery-dialog/gallery-dialog.component';
import { animate, style, state, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

export interface Photo {
  isLoaded: boolean
  src: string
}

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
  animations: [
    trigger('appear', [
      state('show', style({
        opacity: 1
      })),
      transition('* => show', [
        style({ 
          opacity: 0
        }),
        animate('1.5s {{time}}s ease')
      ], {params: {time: '0'}}),      
    ]),
    trigger('appear2', [
      state('show', style({
        opacity: 1
      })),
      transition('* => show', [
        style({ 
          opacity: 0
        }),
        animate('1.5s 2s ease')
      ])     
    ]),
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
  ]
})
export class GalleryComponent implements OnInit {

  isLoading = true

  photos: Photo[] = []
  col2iterator: number[] = []

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    this.initPhotos()
  }

  initPhotos() {
    this.photos = []
    for (let i = 1; i <= 6; i++) {
      this.photos.push({
        isLoaded: false,
        src: `../../../assets/images/g${i}.jpeg`
      })
    }
  }

  openPhoto(photo: Photo) {
    if(photo.isLoaded) {
      this.dialog.open(GalleryDialogComponent, {
        panelClass: 'full-dialog',
        data: {
          selectedPhoto: photo, 
          photos: this.photos
        } as DialogData,
      });
    }
  }
  
  setLoader(loading: boolean) {
    this.isLoading = loading
  }

  get photosLoaded(): boolean {
    return !this.photos.find(photo => !photo.isLoaded)
  }
}
