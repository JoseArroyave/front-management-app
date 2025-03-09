import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "public",
    loadComponent: () => import("@components/public/public.component").then(c => c.PublicComponent),
    loadChildren: () => import("@components/public/public.routes").then(c => c.PublicRoutes),
  },
  {
    path: "pages",
    loadComponent: () => import("@components/pages/page.component").then(c => c.PageComponent),
    loadChildren: () => import("@components/pages/page.routes").then(c => c.PageRoutes),
  },
  { path: "**", redirectTo: "public/not-found" },
];
