import {Component, OnInit} from "@angular/core";
import {NavController, PopoverController} from "ionic-angular";
import {NotificationsPage} from "../notifications/notifications";
import {SettingsPage} from "../settings/settings";
import {SearchLocationPage} from "../search-location/search-location";
import {AnnounceService} from "../../services/announce.service";
import {UserService} from "../../services/user.service";
import {SportService} from "../../services/sport.service";



@Component({
  selector: 'page-home',
  styles: ['agm-map { height: 300px;}'],
  templateUrl: 'home.html'
})

export class HomePage implements OnInit{
  // search condition
  public search = {
    name: "",
    date: new Date().toISOString()
}
  user: string;
  sports: any;
  private RawAnnounces: any;
  private participated: boolean=false;
  private show: boolean;
  private res: boolean;
  private photo: any;
  constructor(public nav: NavController,
              public popoverCtrl: PopoverController,
              private announceService: AnnounceService,
              private userService: UserService,
              private sportService: SportService) {
    console.log( localStorage.getItem('user'));
    this.user=localStorage.getItem('user');
    this.photo=localStorage.getItem('photo');
  }

  ionViewWillEnter() {
    this.photo=localStorage.getItem('photo');
  }
  ngOnInit(): void {
    this.photo=localStorage.getItem('photo');
    this.sportService.loadSports().subscribe(data =>{
        this.sports=data;
        console.log(data);
      },
      error1 => {
        console.log(error1);
      });
  }

  // go to result page
  doSearch() {
  console.log("sport", this.search.name);
    this.announceService.getAnnouncesSportByName(this.search.name).subscribe(resp=> {

  this.RawAnnounces=resp;

   console.log("announces :",resp);

  this.show= true;
   },

  error1 => {
  console.log('error:',error1);
  });
    ////this.nav.push(TripsPage);
  }

  // choose place
  choosePlace(from) {
    this.nav.push(SearchLocationPage, from);
  }

  // to go account page
  goToAccount() {
    this.nav.push(SettingsPage);
  }

  presentNotifications(myEvent) {
    console.log(myEvent);
    let popover = this.popoverCtrl.create(NotificationsPage);
    popover.present({
      ev: myEvent
    });
  }

  onParticipate(a) {

    this.announceService.addPlayer(a.id,this.user).subscribe(resp=>{

      console.log("player added",resp);
      this.participated=true;
  },
      error1 => {
      console.log(error1);
      });

  }

  public isParticipated(id:any, username:string): boolean{

    this.announceService.isParticipated(id,username).subscribe(data=>{
      this.res=<boolean> data;
    },error1 => {console.log(error1);})
    return this.res;
  }


  getNombreJoueur(id: any) {
    this.announceService.getNombreJoueur(id);

  }

  getNombreJoueurTotal(id: any) {
    this.announceService.getNombreJoueurTotal(id);

  }
}

//
