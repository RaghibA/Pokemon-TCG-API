import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

// Make PostsService available to other components
// Making it injectable creates only one instance of the data
@Injectable({providedIn: 'root'})
export class SearchService {
  baseURL = 'http://localhost:4040/'

  // inject http client
  constructor(private http: HttpClient) { }
  
  // Query request [Working]
  findCards(query: string): Observable<any> {
    return this.http.get(this.baseURL + 'search/' + query)
  }
}