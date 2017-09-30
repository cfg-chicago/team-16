import { Component, OnInit } from '@angular/core';
import { DomSanitizer  } from '@angular/platform-browser';
import { MdIconModule, MdIconRegistry } from '@angular/material';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(iconRegistry: MdIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
        'search',
        sanitizer.bypassSecurityTrustResourceUrl('../assets/icons/search.svg'));
  }
  ACTIVE_UID = '';

  ngOnInit() {
  
  }


}
