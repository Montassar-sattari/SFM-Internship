import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {UserService} from "../../services/user.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HomePage} from "../home/home";
import {Camera, CameraOptions} from "@ionic-native/camera";
import {PhotoService} from "../../services/photo.service";



@IonicPage()
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage {
  private username: string;
  private user: any;
  EditForm: FormGroup;
  submitted= false;
  result: any= false;
  private EMAILPATTERN = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
  falsePassword: boolean;
  private photo: string;
  constructor(public navCtrl: NavController,
              private formBuilder: FormBuilder,
              public navParams: NavParams,
              private userService:UserService,
             private  toastController:ToastController,
              private  camera: Camera,
              private alertctrl: AlertController,
              private photoService: PhotoService) {


    this.EditForm = this.formBuilder.group({
      phoneNumber: ['', [Validators.maxLength(12), Validators.pattern('[0-9 + ]*'), Validators.required]],
      email: ['',[Validators.maxLength(30), Validators.pattern(this.EMAILPATTERN),Validators.email, Validators.required]],
      Cpassword: ['',[Validators.minLength(6), Validators.required]]


    });
  }

  ionViewDidLoad() {
    this.photo=localStorage.getItem('photo');
    this.username=localStorage.getItem('user');
    this.userService.getUserByUsername(this.username).subscribe(data=> {
    this.user=data;

    },
      error1 => {
      console.log(error1);
      });

  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'User successfully updated!',
      duration: 4000
    });
    toast.present();
  }

  get f() { return this.EditForm.controls; }

  onSave() {


    this.submitted = true;
    let currentPassword= this.EditForm.get('Cpassword').value;

    let userData={
      'id':this.user.id,
      'nom':this.user.nom,
      'prenom':this.user.prenom,
      'username':this.user.username,
      'numeroTel':this.user.numeroTel,
      'email':this.user.email,
      'password': this.user.password

    }
    if (this.EditForm.get('phoneNumber')!=null) { userData.numeroTel=this.EditForm.get('phoneNumber').value;}


    let TIME_IN_MS = 5000;
    let hideFooterTimeout = setTimeout( () => {

      this.userService.getUserPWD(this.user.id,currentPassword).subscribe(res => {
          this.result=res;
          console.log(this.result);

        },
        error1 => {
          console.log(error1);
        },()=>{

          if (this.result==true) {
            console.log('user data',userData);
            this.userService.updateUserData(userData).subscribe(res=> {
                console.log('user updated');
                console.log(res);
                this.presentToast();
                this.navCtrl.setRoot(HomePage);
              },
              error1 => {
                console.log(error1);
              });
        }});

    }, TIME_IN_MS);



  }


  public async onTakePicture() {


    const option1: CameraOptions ={
      quality:100,
      destinationType:this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
     sourceType: this.camera.PictureSourceType.CAMERA,
      allowEdit:true,
      correctOrientation: true
    };
    const option2: CameraOptions ={
      quality:100,
      destinationType:this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      allowEdit:true,
      correctOrientation: true
    };


    let alert= await this.alertctrl.create({

      title:"Profile picture update",
      message:"choose your source",
      buttons:[
        {
          text:"Camera",
          handler:()=>{
            this.photoService.takePicture(option1);
            this.photo=localStorage.getItem('photo');

          }
        },
        {
          text:"Library",
          handler:()=>{
            this.photoService.takePicture(option2);
            this.photo=localStorage.getItem('photo');
          }

        }
      ]
    });
    await alert.present();
    this.photo=localStorage.getItem('photo');
  }


  /*private getPicture(option: CameraOptions) {
    this.camera.getPicture(option).
      then((data) =>{
      let base64Image = 'data:image/jpeg;base64,' + data;
      this.user.photo=base64Image;
      this.userService.updateUser(this.user).subscribe(data=>{console.log("user updated");},error1 => {console.log(error1);});
    },
      error=>{
        console.log(error);
      });
  }*/

  onCancel() {
    this.navCtrl.setRoot(HomePage);
    //this.navCtrl.getPrevious();
  }
}
