import { UserLocalService } from "@services/user-local.service";
import { inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { IToken } from "@interfaces/services.interface";

@Injectable({ providedIn: "root" })
export class AuthGuard {
  private userLocalService = inject(UserLocalService);
  private router = inject(Router);

  canActivate(): boolean {
    const token = window.localStorage.getItem("accessToken");
    const loginUrl = "/public/login";

    if (!token) {
      this.router.navigate([loginUrl]);
      return true;
    } else {
      const decodedToken: IToken = this.userLocalService.decodeToken(token);
      const actualDatetime: number = Math.floor(Date.now() / 1000);
      this.userLocalService.token = token;

      if (decodedToken.exp <= actualDatetime) {
        this.userLocalService.removeToken();
        this.router.navigate([loginUrl]);
        return false;
      }

      return true;
    }
  }
}
