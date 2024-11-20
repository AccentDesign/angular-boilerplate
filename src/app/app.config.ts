import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { ApplicationConfig } from "@angular/core";
import { provideAnimations } from "@angular/platform-browser/animations";
import { provideRouter, withComponentInputBinding } from "@angular/router";
import { httpInterceptor } from "@modules/shared/interceptors/http.interceptor";
import { routes } from "./app.routes";

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideHttpClient(withInterceptors([httpInterceptor])),
    provideRouter(routes, withComponentInputBinding()),
  ]
};
