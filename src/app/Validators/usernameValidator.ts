import {FormGroup} from "@angular/forms";
import {HttpClient} from "@angular/common/http";



export class UsernameValidator{
  constructor( ) {}


  static validate(controlName1: string,http:HttpClient,controlName2 : string, matchingControlName: string ) {
  return (formGroup: FormGroup) => {
    const userName = formGroup.controls[controlName1];
    const password = formGroup.controls[controlName2];
    const confirmPassword = formGroup.controls[matchingControlName];
    let host: string = "http://Localhost:8080";

    //console.log("this is control",userName)
   /* if (confirmPassword.errors && !confirmPassword.errors.mustMatch) {
      // return if another validator has already found an error on the matchingControl
      return;
    }*/

    // set error on matchingControl if validation fails
    if (password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ mustMatch: true });
    } else {
      confirmPassword.setErrors(null);
    }
    if (userName.value!=""&& userName.touched){

      setTimeout(()=> {

        http.post( host + '/users/checkUsernameAvailability/' + userName.value, {observe: 'response'}).subscribe(resp => {
            const dispo = <boolean>resp.valueOf();

            // set error on matchingControl if validation fails
            if (dispo==false) {
              userName.setErrors({UsedUsername: true });
            } else {
              userName.setErrors(null);
            }

          },
          err => {
            console.log("an error occured");
          });
      },5000)


  }


  }
}


}
