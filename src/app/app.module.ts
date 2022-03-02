import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header.component';
import { FooterComponent } from './layout/footer.component';
import { NavComponent } from './layout/nav.component';
import { AdsComponent } from './layout/ads.component';
import { ContentComponent } from './layout/content.component';
import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './components/home.component';
import { AboutComponent } from './components/about.component';
import { NotfoundComponent } from './components/notfound.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NavComponent,
    AdsComponent,
    ContentComponent,
    LayoutComponent,
    HomeComponent,
    AboutComponent,
    NotfoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
