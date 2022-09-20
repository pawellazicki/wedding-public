import { MatSnackBarComponent } from './components/shared/mat-snack-bar/mat-snack-bar.component';
import { MatDialogModule } from '@angular/material/dialog';
import { TopbarService } from './services/topbar.service';
import { SidenavComponent } from './components/navigation/sidenav/sidenav.component';
import { TopbarComponent } from './components/navigation/topbar/topbar.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSidenavModule} from '@angular/material/sidenav';
import { HomeComponent } from './components/home/home.component';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatRippleModule} from '@angular/material/core';
import { WeddingComponent } from './components/wedding/wedding.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { LovelineComponent } from './components/loveline/loveline.component';
import { BookComponent } from './components/book/book.component';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import { ImageBackgroundComponent } from './components/shared/image-background/image-background.component';
import {MatCardModule} from '@angular/material/card';
import { IconComponent } from './components/shared/icon/icon.component';
import { LovelineRowComponent } from './components/loveline/loveline-row/loveline-row.component';
import { GalleryDialogComponent } from './components/gallery/gallery-dialog/gallery-dialog.component';
import {MatInputModule} from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    AppComponent,
    TopbarComponent,
    SidenavComponent,
    HomeComponent,
    LovelineComponent,
    WeddingComponent,
    GalleryComponent,
    LovelineComponent,
    BookComponent,
    ImageBackgroundComponent,
    IconComponent,
    LovelineRowComponent,
    GalleryDialogComponent,
    MatSnackBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatRippleModule,
    MatDividerModule,
    MatListModule,
    MatCardModule,
    MatDialogModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonToggleModule,
    MatSnackBarModule,
    MatProgressSpinnerModule
  ],
  providers: [
    TopbarService,
    MatSnackBarComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
