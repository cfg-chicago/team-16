import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }

  user_name:string = "";
  pass_word:string = "";
  
  ngOnInit() {

    // setTimeout(function(){
     
    //  document.getElementById('loginbutton').onclick = function(){
    //    var usn = document.getElementById('loginusername').innerHTML;
    //    var pw = document.getElementById('loginpassword').innerHTML;
    //    var d = new Date();
    //    d.setTime(d.getTime() + (60*24*60*60*1000));
    //    var expires = 'expires='+ d.toUTCString();
    //    document.cookie = 'ACTIVE_UID=' + usn + ';' + expires + ';path=/';
    //    var location = '../html/index.html?usn=' + usn + '&?hash=' + pw;
    //    window.location.href = location;
    //  };
    
    // },200);
  }
 
  loginUser() {
    localStorage['login_name'] = this.user_name;    
  }
}
