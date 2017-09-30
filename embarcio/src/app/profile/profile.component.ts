import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProfileService } from "../services/profile.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [ProfileService]
})
export class ProfileComponent implements OnInit {
  userName: string = "";
  url: string = "";
  profileData: any = {};
  profileImg:string = "";

  constructor(private activatedRoute: ActivatedRoute, private _profileService: ProfileService) { }

  ngOnInit() {
    this.activatedRoute.url.subscribe(sa => {
      this.url = "";
      sa.forEach(value => this.url += `/${value}`)
    });
    this.activatedRoute.params.subscribe(p => this.userName = p['username']);
    
    this._profileService.getProfilePage(this.userName)
      .subscribe(res => {
        this.profileData = res[0];
      });  
  }
}
