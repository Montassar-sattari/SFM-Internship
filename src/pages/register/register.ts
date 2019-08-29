import {Component, OnInit} from "@angular/core";
import {NavController, ToastController} from "ionic-angular";
import {LoginPage} from "../login/login";
import { FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UsernameValidator} from "../../app/Validators/usernameValidator";
import {HttpClient} from "@angular/common/http";
import { appConfigService } from "../../services/config.service";






@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage implements OnInit{

  RegisterForm: FormGroup;
  private EMAILPATTERN = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
  private NAMEPATTERN= '^[a-zA-Z ]+$';
  private USERNAMEPATTERN= '^[a-zA-Z0-9]+$';
  submitted= false;
  private host:String;
  constructor(public toastController: ToastController,private config: appConfigService,public nav: NavController, private formBuilder: FormBuilder,private  http: HttpClient) {

    this.host= this.config.getHost();
   this.RegisterForm = this.formBuilder.group({
      firstName: ['', [ Validators.pattern(this.NAMEPATTERN), Validators.required]],
      lastName: ['', [Validators.pattern(this.NAMEPATTERN), Validators.required]],
      userName: ['', [Validators.maxLength(10), Validators.pattern(this.USERNAMEPATTERN), Validators.required]],
      phoneNumber: ['', [Validators.maxLength(12), Validators.pattern('[0-9 + ]*'), Validators.required]],
      email: ['',[Validators.maxLength(30), Validators.pattern(this.EMAILPATTERN),Validators.email, Validators.required]],
      password: ['',[Validators.minLength(6), Validators.required]],
      confirmPassword:['', [Validators.minLength(6), Validators.required]]},

    {
      validator: UsernameValidator.validate('userName',this.http,'password','confirmPassword')

      });

  }
  ngOnInit(): void {

  }


  get f() { return this.RegisterForm.controls; }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'User successfully created! Try to connect now!',
      duration: 4000
    });
    toast.present();
  }

  login() {
    this.nav.setRoot(LoginPage);
  }

  onRegister() {
    this.submitted = true;
  let userData={
      'nom':this.RegisterForm.get('firstName').value,
      'prenom':this.RegisterForm.get('lastName').value,
      'username':this.RegisterForm.get('userName').value,
      'email':this.RegisterForm.get('email').value,
      'numeroTel':this.RegisterForm.get('phoneNumber').value,
      'password':this.RegisterForm.get('password').value,
      'repassword':this.RegisterForm.get('confirmPassword').value
    }

    if (this.RegisterForm.invalid) {
      console.log("invalid form");
      console.log("errors:", this.RegisterForm.controls);
      console.log("value:", this.RegisterForm.value);

      return;
    }
    else {
      console.log("valid form");
      console.log("usser data:",userData);
      this.http.post(this.host+'/register',userData).subscribe( resp => {
        console.log("server resp",resp);

      this.presentToast();
      },
        err=> {
        console.log("an error occurred");
        });
      console.log("value:", this.RegisterForm.value);
      this.nav.setRoot(LoginPage);
    }


    }




}
