import { withInterceptorsFromDi, HTTP_INTERCEPTORS, provideHttpClient, withFetch } from "@angular/common/http";
import { ResponseInterceptor } from "./interceptors/response.interceptor";
import { provideRouter, withViewTransitions } from "@angular/router";
import { ApplicationConfig } from "@angular/core";
import { routes } from "./app.routes";

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptorsFromDi(), withFetch()),
    provideRouter(routes, withViewTransitions()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ResponseInterceptor,
      multi: true,
    },
  ],
};
