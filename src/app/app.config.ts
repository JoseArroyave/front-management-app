import { withInterceptorsFromDi, HTTP_INTERCEPTORS, provideHttpClient, withFetch } from "@angular/common/http";
import { provideRouter, withViewTransitions } from "@angular/router";
import { ApplicationConfig } from "@angular/core";
import { routes } from "./app.routes";

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes, withViewTransitions()), provideHttpClient(withInterceptorsFromDi(), withFetch())],
};
