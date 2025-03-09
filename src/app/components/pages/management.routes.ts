// import { AccessGuard } from '@guards/access.guard';
// import { AuthGuard } from '@guards/auth.guard';
import { Routes } from "@angular/router";

export const ManagementRoutes: Routes = [{ path: "**", redirectTo: "public/not-found" }];
