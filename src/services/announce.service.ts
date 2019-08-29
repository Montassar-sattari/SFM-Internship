import {Injectable, OnInit} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import { appConfigService } from "./config.service";
import {c} from "@angular/core/src/render3";


@Injectable()
export class AnnounceService {
  constructor( private http: HttpClient, private config: appConfigService){
this.host= this.config.getHost();
  }

  private host:String;
  private jwtToken: string;

  GetAnnounces(){

    if (this.jwtToken==null){this.jwtToken=localStorage.getItem('token');}

    return this.http.get(this.host+'/Announces',{ headers:{ 'Authorization': this.jwtToken}});
  }


  getSportsByName( sport: string ) {

    if (this.jwtToken==null){this.jwtToken=localStorage.getItem('token');}

    return this.http.get(this.host+'/sports/Name/'+sport,{ headers:{ 'Authorization': this.jwtToken}});

  }
  addPlayer(id: any, player:string){

    if (this.jwtToken==null){this.jwtToken=localStorage.getItem('token');}
    return this.http.get(this.host+'/Announces/'+id+'/addPlayer/'+player,{ headers:{ 'Authorization': this.jwtToken}});
  }
  getAnnouncesSportByName(sport:string){


    if (this.jwtToken==null){this.jwtToken=localStorage.getItem('token');}

    return this.http.get(this.host+'/sports/Announces/Name/'+sport,{ headers:{ 'Authorization': this.jwtToken}});
  }

  CreateAnnounce(data: any){
    let announceData= {

      'description': data.Description,
      'type': data.Type,
      'date': data.Date
    }
    
      if (this.jwtToken==null){this.jwtToken=localStorage.getItem('token');}
    return this.http.post(this.host+'/Announce/create/'+data.user+'/'+data.Sport+
      '/'+localStorage.getItem('currentLat')+'/'+localStorage.getItem('currentLon'),announceData,{ headers:{ 'Authorization': this.jwtToken}});
  
    }

  isParticipated(id:any, username: any){

    if (this.jwtToken==null){this.jwtToken=localStorage.getItem('token');}

    return this.http.get(this.host+'/Announce/'+id+'/user/'+username,{ headers:{ 'Authorization': this.jwtToken}});
  }
  getNombreJoueur(id:any){

    if (this.jwtToken==null){this.jwtToken=localStorage.getItem('token');}

    return this.http.get(this.host+'/Announce/nombreJoueurs/'+id,{ headers:{ 'Authorization': this.jwtToken}}).subscribe(data=>{
      console.log('nombre joueurs:',data);
      return data.valueOf();

    });
  }
  getNombreJoueurTotal(id: any){

    if (this.jwtToken==null){this.jwtToken=localStorage.getItem('token');}

    return this.http.get(this.host+'/Announce/nombreJoueursTotal/'+id,{ headers:{ 'Authorization': this.jwtToken}}).subscribe(data=>{
      console.log('nombre joueurs:',data);
      return data.valueOf();
    }, error1 => {
      console.log(error1);
    });

}

}
