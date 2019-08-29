import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Storage } from '@ionic/storage';
import {UserService} from "./user.service";

@Injectable()
export class PhotoService {

  public photo: Photo;
  private user:any;
  constructor(private camera: Camera,
              private storage: Storage, private userService:UserService) { }

  takePicture(option:CameraOptions) {

    // tslint:disable-next-line: no-trailing-whitespace

      this.user=localStorage.getItem('user');

      this.camera.getPicture(option).then((imageData) => {
        // Add new photo to gallery
        this.photo=({
          data: 'data:image/jpeg;base64,' + imageData
        });

        // Save all photos for later viewing
        this.storage.set('photo', this.photo);
        localStorage.setItem('photo',this.photo.data);
        //this.user.photo=this.photo.data;

        //this.userService.updateUser(this.user,this.photo.data).subscribe(data=>{console.log("user updated");},error1 => {console.log(error1);});

        //this.navCtrl.setRoot(EditProfilePage);
      }, (err) => {
        // Handle error

        console.log("Camera issue: " + err);
      });




  }

  loadSaved() {
    this.storage.get('photos').then((photos) => {
      this.photo = photos || null;
    });
  }

}

class Photo {
  data: any;
}
