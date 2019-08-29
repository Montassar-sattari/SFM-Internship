import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import { appConfigService } from "./config.service";

@Injectable()
export  class UserService {
  private host:String;
  private jwtToken: string;
  constructor( private  http: HttpClient, private config: appConfigService){
    this.host= this.config.getHost();
  }


  getUserByUsername(username: string) {

    if (this.jwtToken==null){this.jwtToken=localStorage.getItem('token');}

    return this.http.get(this.host+'/userByUsername/'+username,{ headers:{ 'Authorization': this.jwtToken}});
  }
  getUserPWD(id : any,pwd: string) {
    if (this.jwtToken==null){this.jwtToken=localStorage.getItem('token');}
    return  this.http.get( this.host+'/matchPWD/'+pwd+'/user/'+id,{ headers:{ 'Authorization': this.jwtToken}});
  }

  updateUser(user: string, photo: string) {


    if (this.jwtToken==null){this.jwtToken=localStorage.getItem('token');}
    return this.http.get( this.host+'/update/users/'+photo+'/'+user,{ headers:{ 'Authorization': this.jwtToken}})
  }
  updateUserData(user: any) {


    if (this.jwtToken==null){this.jwtToken=localStorage.getItem('token');}
    return this.http.post( this.host+'/update/users',user,{ headers:{ 'Authorization': this.jwtToken}})
  }


}
