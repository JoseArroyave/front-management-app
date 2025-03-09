import { IResponseLogin, IUsers } from "@interfaces/services.interface";
import { JwtHelperService } from "@auth0/angular-jwt";
import { inject, Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class UserLocalService {
  private router = inject(Router);

  public token!: string | null;
  private userSubject = new BehaviorSubject<IUsers | null>(null);
  public user$: Observable<IUsers | null> = this.userSubject.asObservable();

  saveToken = async (response: IResponseLogin) => {
    window.localStorage.setItem("accessToken", response.accessToken);
    this.setInfoUser(response.accessToken);
  };

  decodeToken = (token: string) => {
    return new JwtHelperService().decodeToken(token);
  };

  logout = async () => {
    await this.cleanDataToken();
    this.userSubject.next(null);
    this.router.navigate(["/public/login"]);
  };

  cleanDataToken = () => {
    return new Promise<void>(resolve => {
      window.localStorage.removeItem("accessToken");
      this.token = null;
      resolve();
    });
  };

  setInfoUser(token: string) {
    const decodedToken = this.decodeToken(token);
    this.userSubject.next(decodedToken.user);
  }

  getUser(): IUsers | null {
    return this.userSubject.value;
  }
}
