import { Injectable } from "@angular/core";

@Injectable()
export class appConfigService {


	constructor () {}
	private api: any = {
		//http://Localhost:8080
		SERVER_URL: "https://countmein.cfapps.io",
		countriesApi: 'https://restcountries.eu/rest/v2/all'
	}
	public  getHost(){
		return this.api.SERVER_URL;
	}
}


