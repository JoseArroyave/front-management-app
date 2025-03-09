import { AuthGuard } from "@guards/auth.guard";
import { Routes } from "@angular/router";

export const PageRoutes: Routes = [
  {
    path: "management",
    canActivate: [AuthGuard],
    loadComponent: () => import("@components/pages/management/management.component").then(c => c.ManagementComponent),
  },
  { path: "**", redirectTo: "public/not-found" },
];
