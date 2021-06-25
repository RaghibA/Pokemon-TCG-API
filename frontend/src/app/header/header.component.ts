import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user.model'
import { NgForm } from '@angular/forms';
import { TokenService } from '../services/token.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  auth = false
  token = ''

  constructor(private authService: AuthService, private tokenService: TokenService) { }

  // View User
  ngOnInit() {
    this.authService.viewUser()
      .subscribe((response) => {
        if (response.username) {
          this.auth = true
        }
      })
  }

  onLogOut() {
    this.authService.logout()
      .subscribe((response) => {
        if(response.status == 200) {this.auth = false}
      })
    this.tokenService.remove('currentUser')
  }

}
