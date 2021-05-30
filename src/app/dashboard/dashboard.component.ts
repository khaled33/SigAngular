import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../_service/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  currentUser: any;

  constructor(private router: Router) {

  }

  ngOnInit() {
    if (localStorage.getItem('login')=== '1'){
      localStorage.removeItem('login');
      this.router.navigate(["/dashboard/Analytics"])
    }
  }

}
