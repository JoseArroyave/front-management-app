import { AuthGuard } from "@guards/auth.guard";
import { Routes } from "@angular/router";

export const PageRoutes: Routes = [
  {
    title: "Gestor de tareas",
    path: "tasks",
    canActivate: [AuthGuard],
    loadComponent: () => import("@components/pages/tasks/tasks.component").then(c => c.TasksComponent),
  },
  { path: "**", redirectTo: "public/not-found" },
];
