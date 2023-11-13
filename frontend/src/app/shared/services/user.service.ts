import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserInfoType} from "../../../types/user-info.type";
import {DefaultResponseType} from "../../../types/default-response.type";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userName: string = 'userName';

  constructor(private http: HttpClient) {
  }

  getUserInfo(x_authToken: string): Observable<UserInfoType | DefaultResponseType> {
    return this.http.get<UserInfoType | DefaultResponseType>(environment.api + 'users');
  }

  public setName(userName: string): void{
    localStorage.setItem(this.userName, userName);
  }

  public getName(): string | null {
    return localStorage.getItem(this.userName);
  }

  public removeName(){
    localStorage.removeItem(this.userName);
  }
}
