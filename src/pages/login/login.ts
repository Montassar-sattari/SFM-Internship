import {Component} from "@angular/core";
import {NavController, AlertController, ToastController, MenuController, NavParams} from "ionic-angular";
import {HomePage} from "../home/home";
import {RegisterPage} from "../register/register";
import {AuthenticationService} from "../../services/authentication.service";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  
   
  mode: number=0;
  user={
    username:'',
    password:''
  };
   constructor(public nav: NavController, public navParams: NavParams,public forgotCtrl: AlertController,
              public menu: MenuController, public toastCtrl: ToastController,
              private  authService: AuthenticationService,

              ) {
    this.menu.swipeEnable(false);

    
  }
  // go to register page
  register() {
    this.nav.setRoot(RegisterPage);
  }

  // login and go to home page
  onLogin(FormData) {
    console.log("am here");
    console.log(FormData.value);
    console.log("1",FormData.value.username);
    //console.log("2",FormData.username.value);

  this.authService.login(FormData.value).subscribe( resp=> {
  let JwtToken=resp.headers.get("Authorization");
  console.log(JwtToken);
  this.authService.saveToken(JwtToken);
  this.authService.saveUser(FormData.value.username);
  this.nav.setRoot(HomePage,FormData.value.username);

  },
    err =>{
  this.mode=1;
  console.log("an error occurred");

    } );

    //this.nav.setRoot(HomePage);
  }

  forgotPass() {
    let forgot = this.forgotCtrl.create({
      title: 'Forgot Password?',
      message: "Enter you email address to send a reset link password.",
      inputs: [
        {
          name: 'email',
          placeholder: 'Email',
          type: 'email'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Send',
          handler: data => {
            console.log('Send clicked');
            let toast = this.toastCtrl.create({
              message: 'Email was sended successfully',
              duration: 3000,
              position: 'top',
              cssClass: 'dark-trans',
              closeButtonText: 'OK',
              showCloseButton: true
            });
            toast.present();
          }
        }
      ]
    });
    forgot.present();
  }

}
