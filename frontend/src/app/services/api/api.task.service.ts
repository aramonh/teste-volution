import { Task } from '../../shared/models/task.interface';
import { async } from '@angular/core/testing';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ApiServiceExample {
  private urlapi= '/api/tasks';
  


constructor(private _httpClient: HttpClient) {}

ngOnInit() {

}






getById(idTask:String):Observable<Task>{
  const result = this._httpClient.get<Task>(this.urlapi+`/${idTask}`).pipe(
    catchError(this.handleError)
  );
  return result;
  console.log('Get ByID Task',result);
}


getAll():Observable<Task>{
  const result = this._httpClient.get<Task>(this.urlapi).pipe(
    catchError(this.handleError)
  );
  return result;
  console.log('Get All Tasks',result);
}




createTask(task: Task ):Observable<Task>{
  const result = this._httpClient.post<Task>(this.urlapi,task).pipe(
    catchError(this.handleError)
  );;
  return result;
  console.log('POST TASK ',result);

}

updateById(idTask:String, task : Task ):Observable<Task>{
  const result = this._httpClient.put<Task>(this.urlapi+`/${idTask}`, task).pipe(
    catchError(this.handleError)
  );
  return result;
  console.log('Update ByID Task',result);
}

deleteById(idTask:String):Observable<Task>{
  const result = this._httpClient.delete<Task>(this.urlapi+`/${idTask}`).pipe(
    catchError(this.handleError)
  );
  return result;
  console.log('Delete ByID Task',result);
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
