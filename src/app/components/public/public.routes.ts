import { LoginGuard } from "@guards/login.guard";
import { Routes } from "@angular/router";

export const PublicRoutes: Routes = [
  {
    title: "404 - Not found",
    path: "not-found",
    loadComponent: () => import("@components/public/not-found/not-found.component").then(c => c.NotFoundComponent),
  },
  {
    title: "Login",
    path: "login",
    canActivate: [LoginGuard],
    loadComponent: () => import("@components/public/login/login.component").then(c => c.LoginComponent),
  },
  {
    title: "Sign Up",
    path: "signup",
    loadComponent: () => import("@components/public/signup/sign-up.component").then(c => c.SignupComponent),
  },
  { path: "**", redirectTo: "not-found" },
];
