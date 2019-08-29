import {Component, OnInit} from '@angular/core';
import {NavController, Platform} from 'ionic-angular';
import {Geolocation} from '@ionic-native/geolocation';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'page-local-weather',
  templateUrl: 'local-weather.html'
})
export class LocalWeatherPage implements OnInit {
  ngOnInit(): void {

    this.getMyLocation();
  }
  weather: any;
  location: {
    state: string,
    city: string
  };
  public locationList: Array<any> = [
    {city: 'Los Angeles', state: 'CA'},
    {city: 'Miami', state: 'FL'},
    {city: 'New York', state: 'NY'},
    {city: 'Seattle', state: 'WA'}
  ]
  apiKey = 'appid=72993a0fbb86b10ffdbc38b050a4825d';
  url: string="http://api.openweathermap.org/data/2.5/forecast?q=";
  private dataMeteo;
  private currentLongitude: number;
  private currentLatitude: number;
  private urlCoord: string="http://api.openweathermap.org/data/2.5/forecast?";

  constructor(
    private geolocation: Geolocation,
    public navCtrl: NavController,
    private  http: HttpClient,
    public platform: Platform) {

      this.getMyLocation();
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

  OnLoadMeteo() {
    this.http.get(this.url + 'Nabeul'  + ',' + 'TN'+ '&'+this.apiKey).subscribe(resp =>{

    this.dataMeteo=resp;
    console.log('this is dataMeteo',this.dataMeteo);
    }, err => {
      console.log(err);
    });
  }

  OnLoadLocalMeteo() {

    let lon= +localStorage.getItem('currentLon');
    let lat= +localStorage.getItem('currentLat');

    this.http.get(this.urlCoord+'lat='+lat+'&'+'lon='+lon+'&'+this.apiKey).subscribe(resp =>{

      this.dataMeteo=resp;
      console.log('this is dataMeteo',this.dataMeteo);
    }, err => {
      console.log(err);
    });
  }
}
