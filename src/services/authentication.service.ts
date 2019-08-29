import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {FormControl} from "@angular/forms";
import { appConfigService } from "./config.service";

@Injectable()
export  class AuthenticationService {

  private host:String;
  public jwtToken= null;
  res: boolean;
  public user=null;

  constructor( private http: HttpClient, private config: appConfigService){
    this.host= this.config.getHost();
  }

  login( user) {
    return this.http.post(this.host+"/login",user, {observe: 'response'});

  }

  saveToken(JwtToken: string) {

  localStorage.setItem('token', JwtToken);
  }

  saveUser(Username: string) {
    localStorage.setItem('user',Username)
    //localStorage.setItem('user', Username);
  }
  loadUser(){

     this.user= localStorage.getItem('user') ;


  }
  loadToken(){

    this.jwtToken=localStorage.getItem("Authorization");
  }
  register( user){
    return this.http.post(this.host+"/register",user, {observe: 'response'});

  }


  getAv(control: FormControl) {

    this.http.post(this.host + '/users/checkUsernameAvailability/' + control.value, {observe: 'response'}).subscribe(resp => {
        this.res = <boolean>resp.valueOf();
        console.log("this is the reposponse"+resp);
        console.log("this is res:",this.res);
      },
      err => {
        console.log("an error occured");
      });
  }

  IsUserNameAvailable(control: FormControl): any {

    console.log("this is it"+control);
    if (control) {this.getAv(control);}

    return new Promise(resolve => {

      if (!this.res) {

        resolve({
          "username taken": true
        });

      } else {
        resolve(null);
      }


    });

  }


}
