import { Injectable } from '@angular/core';


import { Observable, of, throwError } from 'rxjs';
import { User } from 'src/app/shared/models/user.interface';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';





@Injectable({ providedIn: 'root' })
export class AuthService  {
  private urlapi= '/api/auth';
  user=null;

  constructor(private _httpClient: HttpClient) {
    console.log("CONSTRUCTOR AUTHS")
    if(this.logIn){
      this.user={
        email:localStorage.getItem('email'),
        name:localStorage.getItem('name')
      }
    }
    /*
    this.user$ = this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges(); // user
        }
        return of(null);
      })
    );*/
  }

  login(email:String, password:String ):Observable<User>{

    const user ={
      email:email,
      password:password
    }
    const result = this._httpClient.post<User>(this.urlapi+`/login`,user).pipe(
      catchError(this.handleError)
    );;
    console.log('POST LOGIN  USER ',result);
    return result;
    
  
  }
  register(email:String, password:String , name:String ):Observable<User>{

    const user ={
      email:email,
      password:password,
      name:name
    }
    const result = this._httpClient.post<User>(this.urlapi+`/register`,user).pipe(
      catchError(this.handleError)
    );;
  
    console.log('POST Register  USER ',result);
    return result;
  }

  logout():Observable<any>{

    const data ={
      token:localStorage.getItem('token')
    }
    const result = this._httpClient.post<User>(this.urlapi+"/logout",data).pipe(
      catchError(this.handleError)
    );;
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    console.log('POST LOGOUT  USER ',result);
    return result;

  }
  public saveUser(data:any){
    this.user={
      email:data.email,
      name:data.name
    }
    
    console.log("SAVE THIS ",this.user);
  }

  public get logIn(): boolean {
    return (localStorage.getItem('token') !== null);
  }

  
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };
  
  }


