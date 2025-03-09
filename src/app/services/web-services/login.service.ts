import { IResponse, IResponseLogin } from "@interfaces/services.interface";
import { environment } from "src/environments/environment";
import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class LoginService {
  private http = inject(HttpClient);

  private readonly url = `${environment.apiUrl}auth/`;

  public login = (params: { email: string; password: string }): Observable<IResponse<IResponseLogin>> => {
    return this.http.post<IResponse<IResponseLogin>>(`${this.url}login`, params);
  };
}
