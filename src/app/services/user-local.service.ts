import { IResponseLogin } from "src/app/interfaces/services.interface";
import { JwtHelperService } from "@auth0/angular-jwt";
import { inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class UserLocalService {
  private router = inject(Router);

  public token!: string | null;

  saveToken = async (response: IResponseLogin) => {
    window.localStorage.setItem("accessToken", response.accessToken);
  };

  decodeToken = (token: string) => new JwtHelperService().decodeToken(token);

  logout = async () => {
    await this.cleanDataToken();
    this.router.navigate(["/public/login"]);
  };

  cleanDataToken = () => {
    return new Promise<void>(resolve => {
      window.localStorage.removeItem("accessToken");
      this.token = null;
      resolve();
    });
  };
}
