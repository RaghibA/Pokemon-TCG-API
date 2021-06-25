import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user.model';
import { Token } from '@angular/compiler/src/ml_parser/lexer';
import { TokenService } from '../services/token.service';
// import {MatDialog} from '@angular/material'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  myUser: User = {
    username: '',
    _id: '',
    email: '',
    token: ''
  }

  constructor(private router: Router,
    private authService: AuthService,
    private tokenService: TokenService) { }

  authenticated = false
  username = ''
  password = ''


  ngOnInit() {
  }

  onLogin() {
    this.authService.login(this.username, this.password)
      .subscribe((response: any) => {
        if (response.token) {
          // Authenticate user
          this.authenticated = true
          
          // assign user variables for testing
          // TODO: Store token in local storage
          this.myUser.username = response.user.username
          this.myUser._id = response.user._id
          this.myUser.email = response.user.email
          this.myUser.token = response.token


          this.tokenService.set('currentUser', this.myUser.token)
        }
      })
  }
}
