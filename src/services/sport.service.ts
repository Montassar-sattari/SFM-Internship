import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import { appConfigService } from "./config.service";

@Injectable()
export class SportService {

  private host:String;
  private jwtToken: string;

  constructor( private http: HttpClient, private config: appConfigService){

    this.host= this.config.getHost();
  }
  getSportsByName( sport: string ) {

    if (this.jwtToken==null){this.jwtToken=localStorage.getItem('token');}

    return this.http.get(this.host+'/sports/Name/'+sport,{ headers:{ 'Authorization': this.jwtToken}});

  }

  loadSports(){

    if (this.jwtToken==null){this.jwtToken=localStorage.getItem('token');}

    return this.http.get(this.host+'/sports',{ headers:{ 'Authorization': this.jwtToken}});
  }


}
