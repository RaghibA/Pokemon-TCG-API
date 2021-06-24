import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { User } from '../models/user.model'

// Make PostsService available to other components
// Making it injectable creates only one instance of the data
@Injectable({providedIn: 'root'})
export class AuthService {
  baseURL = 'http://localhost:4040'

  // inject http client
  constructor(private http: HttpClient) { }
  
  // Log in
  login(username: string, password: string) {
    return this.http.post<User>(this.baseURL + '/users/login', {username, password})
  }

  
}