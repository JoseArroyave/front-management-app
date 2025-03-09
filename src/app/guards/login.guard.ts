import { Injectable, inject, PLATFORM_ID } from "@angular/core";
import { UserLocalService } from "@services/user-local.service";
import { CanActivate, Router } from "@angular/router";
import { isPlatformBrowser } from "@angular/common";

@Injectable({ providedIn: "root" })
export class LoginGuard implements CanActivate {
  private userLocalService = inject(UserLocalService);
  private router = inject(Router);

  private platformId = inject(PLATFORM_ID);

  canActivate(): boolean {
    if (isPlatformBrowser(this.platformId)) return true;

    const token = localStorage.getItem("accessToken");
    if (!token) return true;

    this.userLocalService.token = token;
    this.router.navigate(["/pages/tasks"]);
    return false;
  }
}
