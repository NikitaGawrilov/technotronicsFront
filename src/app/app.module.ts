import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { ActivityComponent } from './components/activity/activity.component';

import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { CdkDrag, CdkDropList, CdkDropListGroup } from '@angular/cdk/drag-drop'


@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    ActivityComponent,
  ],
  imports: [
    MatExpansionModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    CdkDrag,
    CdkDropList,
    CdkDropListGroup
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
