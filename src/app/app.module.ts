import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { ActivityComponent } from './components/activity/activity.component';

import { MatExpansionModule } from '@angular/material/expansion';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CdkDrag, CdkDropList, CdkDropListGroup } from '@angular/cdk/drag-drop'
import { InterceptorService } from './services/interceptor.service';
import { DevicePopupComponent } from './components/device-popup/device-popup.component';
import { BatteryPopupComponent } from './components/battery-popup/battery-popup.component';


@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    ActivityComponent,
    DevicePopupComponent,
    BatteryPopupComponent,
  ],
  imports: [
    MatExpansionModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    CdkDrag,
    CdkDropList,
    CdkDropListGroup,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatDialogModule,
    MatSelectModule,
    MatFormFieldModule
  ],
  providers: [
    { 
      provide: HTTP_INTERCEPTORS, 
      useClass: InterceptorService, 
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
