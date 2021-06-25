import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'
import { User } from '../models/user.model'
import { TokenService } from './token.service'

// Make PostsService available to other components
// Making it injectable creates only one instance of the data
@Injectable({providedIn: 'root'})
export class AuthService {
  baseURL = 'http://localhost:4040/'

  // inject http client
  constructor(private http: HttpClient, private tokenService: TokenService) { }
  
  // Log in
  login(username: string, password: string) {
    return this.http.post<User>(this.baseURL + 'users/login', {username, password})
  }

  // log in
  logout() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.tokenService.get('currentUser')
    })
    return this.http.post<any>(this.baseURL + 'users/logout', { headers })
  }

  // view current user
  viewUser() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.tokenService.get('currentUser')
    })
    return this.http.get<any>(this.baseURL + 'users/me', { headers })
  }

}