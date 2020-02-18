import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  loggedInUser: {userName: string, role: string, isExist: boolean} = { userName: '', role: '', isExist: false}
  userData = [
    {
      userName: 'Admin',
      password: 'Admin',
      role: 'Admin'
    }
  ];

  constructor() { }

  checkUserCredential(userName, password): Observable<any> {
    const uIdx = this.userData.findIndex(user => user.userName === userName && user.password === password);
    if(uIdx !== -1) {
      this.loggedInUser.userName = this.userData[uIdx].userName;
      this.loggedInUser.role = this.userData[uIdx].role;
      this.loggedInUser.isExist = true;
    } else {
      this.loggedInUser.isExist = false;
    }
    return of(this.loggedInUser);
  }

  getLoggedInUser(): Observable<any> {
    return of(this.loggedInUser);
  }
}
