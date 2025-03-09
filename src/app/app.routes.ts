import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "public",
    loadComponent: () => import("@components/public/public.component").then(c => c.PublicComponent),
    loadChildren: () => import("@components/public/public.routes").then(c => c.PublicRoutes),
  },
  {
    path: "management",
    loadComponent: () => import("@components/pages/management.component").then(c => c.ManagementComponent),
    loadChildren: () => import("@components/pages/management.routes").then(c => c.ManagementRoutes),
  },
  { path: "", redirectTo: "public/login", pathMatch: "full" },
  { path: "**", redirectTo: "public/not-found" },
];
