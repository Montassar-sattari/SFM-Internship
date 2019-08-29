import {Component, OnInit} from '@angular/core';
import {IonicPage, LoadingController, NavController, ToastController} from 'ionic-angular';
import {HttpClient} from "@angular/common/http";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SportService} from "../../services/sport.service";
import {Geolocation} from "@ionic-native/geolocation";
import {AnnounceService} from "../../services/announce.service";
import {HomePage} from "../home/home";
import { appConfigService } from '../../services/config.service';

@IonicPage()
@Component({
  selector: 'page-announce',
  templateUrl: 'announce.html',
})
export class AnnouncePage  implements OnInit {

  AnnounceForm: FormGroup;

  submitted = false;
  private host:String;
  sports: any;
  private date: string;
  private currentLatitude: number;
  private currentLongitude: number;

  constructor(public toastController: ToastController,
              public nav: NavController,
              private formBuilder: FormBuilder,
              private  http: HttpClient,
              private sportService:SportService,
              private geolocation: Geolocation,
              private announceService: AnnounceService,
              private config : appConfigService,
              public loadingCtrl: LoadingController) {
    this.host= this.config.getHost();
    


    this.AnnounceForm = this.formBuilder.group({
      Description: ['', [Validators.maxLength(50),Validators.required]],
      Type: ['', [Validators.required,Validators.maxLength(20)]],
      Date: ['', [ Validators.required]],
      Sport: ['', [ Validators.required]]
    });
  this.date=new Date().toISOString();
  }


    ngOnInit()
    {
      this.getMyLocation();
    this.sportService.loadSports().subscribe(data =>{
      this.sports=data;
    },
      error1 => {
      console.log(error1);
      });

    }
  presentLoadingDefault() {
    let loading = this.loadingCtrl.create({
      content: 'Saving Announce...'
    });

    loading.present();

    setTimeout(() => {

      loading.dismiss();
      this.nav.setRoot(HomePage);
      this.presentToast();
    }, 5000);
  }
    getMyLocation(){

      this.geolocation.getCurrentPosition({enableHighAccuracy: true}).then((resp) => {
        
        this.currentLatitude=resp.coords.latitude;
        this.currentLongitude=resp.coords.longitude;
        localStorage.setItem('currentLon',this.currentLongitude.toString());
        localStorage.setItem('currentLat',this.currentLatitude.toString());
        // resp.coords.latitude
        // resp.coords.longitude
        console.log("My current location is:",this.currentLatitude,this.currentLongitude);
       }).catch((error) => {
         console.log('Error getting location', error);
       });
  
      /* let watch = this.geolocation.watchPosition();
      watch.subscribe((data) => {
  
  
        this.currentLatitude=data.coords.latitude;
        this.currentLongitude=data.coords.longitude;
        localStorage.setItem('currentLon',this.currentLongitude.toString());
        localStorage.setItem('currentLat',this.currentLatitude.toString());
        
      }); */
    }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Announce successfully created!',
      duration: 4000
    });
    toast.present();
  }

  get f() { return this.AnnounceForm.controls; }

    ionViewDidLoad()
    {

    }


  onCreateAnnounce() {
    this.submitted = true;
    let announceData= {

      'Description': this.AnnounceForm.get('Description').value,
      'Type': this.AnnounceForm.get('Type').value,
      'Date': this.AnnounceForm.get('Date').value,
      'Sport': this.AnnounceForm.get('Sport').value,
      'user': localStorage.getItem('user')
    }

    if (this.AnnounceForm.invalid) {
      console.log("invalid form");
      console.log("errors:", this.AnnounceForm.controls);
      console.log("value:", this.AnnounceForm.value);

      return;
  }

    else {
      console.log("valid form");
      console.log("announce data:",announceData);
  this.announceService.CreateAnnounce(announceData).subscribe(data=>{

    //console.log(data);
    this.presentLoadingDefault();
   // this.presentToast();


  },
    error1 => {
    console.log(error1);
    });

  }

  }
}
