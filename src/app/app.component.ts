import { Component, ViewChild } from "@angular/core";
import { Platform, Nav } from "ionic-angular";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Keyboard } from '@ionic-native/keyboard';

import { HomePage } from "../pages/home/home";
import { LoginPage } from "../pages/login/login";
import { LocalWeatherPage } from "../pages/local-weather/local-weather";
import {AnnouncePage} from "../pages/announce/announce";
import {UserService} from "../services/user.service";
import {EditProfilePage} from "../pages/edit-profile/edit-profile";


export interface MenuItem {
  title: string;
  component: any;
  icon: string;
}

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  appMenuItems: Array<MenuItem>;
  user: any;
  private appUser: any;
  private photo: string;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public keyboard: Keyboard,
    private userService: UserService
  ) {
    this.initializeApp();

    this.appMenuItems = [
      {title: 'Home', component: HomePage, icon: 'home'},
      {title: 'Local Weather', component: LocalWeatherPage, icon: 'partly-sunny'},
      {title: 'Add Announce', component: AnnouncePage, icon: 'add-circle'}

    ];


  }

  initializeApp() {
    console.log( localStorage.getItem('user'));
    this.photo=localStorage.getItem('photo');
    this.user=localStorage.getItem('user');
   if(this.user!=null) {
     this.userService.getUserByUsername(this.user).subscribe(user=>{
       this.appUser=user;
     }, error1 => {
       console.log(error1);
     });
   }
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.

      //*** Control Splash Screen
      // this.splashScreen.show();
      // this.splashScreen.hide();

      //*** Control Status Bar
      this.statusBar.styleDefault();
      this.statusBar.overlaysWebView(false);

      //*** Control Keyboard
      //this.keyboard.disableScroll(true);
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  logout() {
    this.nav.setRoot(LoginPage);
  }

  onEditProfile() {
    this.nav.setRoot(EditProfilePage);
  }


}
