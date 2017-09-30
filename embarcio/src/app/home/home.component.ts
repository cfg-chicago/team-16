import { Component, OnInit } from '@angular/core';
import { DomSanitizer  } from '@angular/platform-browser';
import { MdIconModule, MdIconRegistry } from '@angular/material';
import { ProfileService } from "../services/profile.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ProfileService]
})
export class HomeComponent implements OnInit {
  profiles = [];

  constructor(iconRegistry: MdIconRegistry, sanitizer: DomSanitizer, private _profileService: ProfileService) {
    iconRegistry.addSvgIcon(
        'favorite',
        sanitizer.bypassSecurityTrustResourceUrl('../assets/icons/favorite.svg'));
  }

  ngOnInit() { 
    this._profileService.getProfiles()
      .subscribe(res => {
        this.profiles = res['profiles'];
      });    
  }
}
