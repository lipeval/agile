import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators'


export interface TokenResponse {
  auth: boolean,
  token: string
}


@Injectable({
  providedIn: 'root'
})

export class AuthService {
  
  private apiKey: string = '23567b218376f79d9415';
  

  constructor(private http: HttpClient) { }

  getToken() {
    return this.http.post<TokenResponse>('http://interview.agileengine.com/auth', {apiKey: this.apiKey})
    .pipe(
      map(res => {
        console.log(res)
        if(!res.auth) {
          console.log('Authorization failed')
        } else {
          return localStorage.setItem('token', res.token)
        }
       
      })
    ) 
  }
}
