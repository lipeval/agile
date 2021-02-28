import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { ResponseData } from './response-data';
import {  tap, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  params: HttpParams

  constructor(private http: HttpClient) { }


  // Get all the images from server
  fetchData() {
    return this.http.get<ResponseData>('http://interview.agileengine.com/images', {params: this.params})
    .pipe(
      tap((response: ResponseData) => {
        // Append param to paginate the data
          this.params = new HttpParams()
            .append('page', response.page.toString())
      }),
      catchError(this.handleError)
    )
  }

  // get the images by id
  getImageId(id) {
    return this.http.get(`http://interview.agileengine.com/images/${id}`)
      .pipe(
        catchError(this.handleError)
      )
  }

  
  private handleError(errorRes: HttpErrorResponse) {
    let errorMsg;
    if(errorRes.status === 401) {
      errorMsg = errorRes.statusText;
    }
     return throwError(errorMsg);
  }
}
