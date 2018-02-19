import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable } from 'rxjs/Rx';

@Injectable()
export class UserService {
constructor(private http:Http) { }

  getUsers() {
    return this.http.get('/api/users').map((res: Response) => res.json());
  }

  saveData(data: any) {
    let body = JSON.stringify(data);
    return this.http.post('/api/user', body ).map((res: Response) => res.json());
  }

  deleteUser(id: number) {
    return this.http.delete('/api/users/'+id).map((res: Response) => res.json()); 
  }

  fillData() {
    return this.http.get('/api/fillData').map((res: Response) => res.json()); 
  }
}