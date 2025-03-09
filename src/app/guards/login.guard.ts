import { Injectable, inject, PLATFORM_ID } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { isPlatformBrowser } from "@angular/common";

@Injectable({ providedIn: "root" })
export class LoginGuard implements CanActivate {
  private router = inject(Router);
  private platformId = inject(PLATFORM_ID);

  canActivate(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      const isLoggedIn = localStorage.getItem("accessToken");
      if (!isLoggedIn) {
        this.router.navigate(["/public/login"]);
        return false;
      }
    }
    return true;
  }
}
