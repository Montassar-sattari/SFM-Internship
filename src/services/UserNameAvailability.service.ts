import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";

@Injectable()
export  class UserNameAvailabilityService {
  res: boolean=false;
  private host: string = "https://countmein.cfapps.io";

  constructor(private http: HttpClient) {


  }

  getAv(control: String) {

    this.http.post(this.host + '/users/checkUsernameAvailability/' + control, {observe: 'response'}).subscribe(resp => {
        this.res = <boolean>resp.valueOf();
        console.log("this is the response"+resp);
        console.log("this is res:",this.res);
      },
      err => {
        console.log("an error occurred");
      });
  }

  IsUserNameAvailable(control: String): any {

    console.log("this is it: "+control);
    this.getAv(control);
   // if (this.res== false) {

      return this.res;








   /* return new Promise(resolve => {

      if (!this.res) {

        resolve({
          "username taken": true
        });

      } else {
        resolve(null);
      }


    });*/

  }
}
