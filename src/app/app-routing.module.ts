import { BookComponent } from './components/book/book.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { WeddingComponent } from './components/wedding/wedding.component';
import { LovelineComponent } from './components/loveline/loveline.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export enum RouteType {
  HOME = 'home',
  WEDDING = 'wedding',
  GALLERY = 'gallery',
  LOVELINE = 'loveline',
  BOOK = 'book',
}

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {
    path: RouteType.HOME,
    component: HomeComponent,
  },
  {
    path: RouteType.WEDDING,
    component: WeddingComponent
  },
  {
    path: RouteType.GALLERY,
    component: GalleryComponent
  },
  {
    path: RouteType.LOVELINE,
    component: LovelineComponent
  },
  {
    path: RouteType.BOOK,
    component: BookComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
