import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {Keyboard} from '@ionic-native/keyboard';
import {MyApp} from "./app.component";

import {SettingsPage} from "../pages/settings/settings";
import {HomePage} from "../pages/home/home";
import {LoginPage} from "../pages/login/login";
import {NotificationsPage} from "../pages/notifications/notifications";
import {RegisterPage} from "../pages/register/register";
import {SearchLocationPage} from "../pages/search-location/search-location";
import {LocalWeatherPage} from "../pages/local-weather/local-weather";
import {AuthenticationService} from "../services/authentication.service";
import {ReactiveFormsModule} from "@angular/forms";
import {UserNameAvailabilityService} from "../services/UserNameAvailability.service";
import {UserService} from "../services/user.service";
import { Geolocation } from '@ionic-native/geolocation';
import {AnnouncePage} from "../pages/announce/announce";
import {AnnounceService} from "../services/announce.service";
import {AgmCoreModule} from "@agm/core";
import {EditProfilePage} from "../pages/edit-profile/edit-profile";
import {SportService} from "../services/sport.service";
import {Camera} from "@ionic-native/camera";
import { appConfigService } from '../services/config.service';
import {PhotoService} from "../services/photo.service";




// import services
// end import services
// end import services

// import pages
// end import pages

@NgModule({
  declarations: [
    MyApp,
    SettingsPage,
    HomePage,
    EditProfilePage,
    AnnouncePage,
    LoginPage,
    LocalWeatherPage,
    NotificationsPage,
    RegisterPage,
    SearchLocationPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,

    IonicModule.forRoot(MyApp, {
      scrollPadding: false,
      scrollAssist: true,
      autoFocusAssist: false
    }),

    IonicStorageModule.forRoot({
      name: '__CountMeInDB',
      driverOrder: ['indexeddb', 'sqlite', 'websql']
    }),
    AgmCoreModule.forRoot({
      apiKey:'AIzaSyDEwEYnce6vP14mPxTZ-sv6SSM6DzErTUQ'
    })],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    EditProfilePage,
    SettingsPage,
    HomePage,
    LoginPage,
    AnnouncePage,
    LocalWeatherPage,
    NotificationsPage,
    RegisterPage,
    SearchLocationPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Keyboard,
    AnnounceService,
    SportService,appConfigService,
    UserNameAvailabilityService,
    AuthenticationService,
    UserService,
    Geolocation,
    Camera,
    PhotoService,


    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})

export class AppModule {
}
