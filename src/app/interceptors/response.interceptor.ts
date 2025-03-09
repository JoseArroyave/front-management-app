import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from "@angular/common/http";
import { SwalPopupService } from "@services/swal-popup.service";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { inject } from "@angular/core";

export class ResponseInterceptor implements HttpInterceptor {
  private toast = inject(SwalPopupService);

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        switch (error.status) {
          case 401:
            this.toast.setToastPopup("Por favor intenta nuevamente", "error");
            break;

          case 500:
            this.toast.setToastPopup("Ha ocurrido un error, comunícate con un asesor", "error");
            break;

          case 404:
            this.toast.setToastPopup("Acción inexistente, comunícate con un asesor", "error");
            break;

          default:
            this.toast.setToastPopup("Ha ocurrido un error, contacta un asesor", "error");
            break;
        }
        return throwError(error);
      })
    );
  }
}
