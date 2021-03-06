import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../_service/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private authenticationService:AuthenticationService) { }

  ngOnInit() {
  }

  logout() {
    console.log("logout");
    this.authenticationService.logout();
  }
}
