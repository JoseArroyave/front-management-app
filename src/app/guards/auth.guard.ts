import { UserLocalService } from "@services/user-local.service";
import { inject, Injectable, PLATFORM_ID } from "@angular/core";
import { IToken } from "@interfaces/services.interface";
import { isPlatformBrowser } from "@angular/common";
import { Router } from "@angular/router";

@Injectable({ providedIn: "root" })
export class AuthGuard {
  private userLocalService = inject(UserLocalService);
  private router = inject(Router);

  private platformId = inject(PLATFORM_ID);

  canActivate(): boolean {
    if (!isPlatformBrowser(this.platformId)) return true;

    const token = window.localStorage.getItem("accessToken");
    const loginUrl = "/public/login";

    if (!token) {
      this.router.navigate([loginUrl]);
      return false;
    }

    const decodedToken: IToken = this.userLocalService.decodeToken(token);
    const actualDatetime: number = Math.floor(Date.now() / 1000);
    this.userLocalService.token = token;

    if (decodedToken.exp <= actualDatetime) {
      this.userLocalService.logout();
      this.router.navigate([loginUrl]);
      return false;
    }

    this.userLocalService.setInfoUser(token); // Emitir el usuario decodificado
    return true;
  }
}
