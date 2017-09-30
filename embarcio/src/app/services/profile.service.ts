import { Injectable } from '@angular/core';
import { Http, Response} from "@angular/http";
import "rxjs/add/operator/map";

@Injectable()
export class ProfileService {

  constructor(private _http: Http) { }

  // private _url = "./db.json";
  //using json-server
  private _base_url = "http://localhost:3001/db";
  
  getProfiles() {
    return this._http.get(this._base_url)
      .map(res => res.json());
  }

  private _profile_url = "http://localhost:3001/profiles"
  getProfilePage(username:string) {
    return this._http.get(this._profile_url + "?username=" + username)
      .map(res => res.json());
  }

  
}
