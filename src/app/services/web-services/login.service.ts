import { IResponse, IResponseLogin } from "@interfaces/services.interface";
import { environment } from "src/environments/environment";
import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class LoginService {
  private http = inject(HttpClient);

  private readonly url = `${environment.apiUrl}auth/`;

  public login = (params: { email: string; password: string }) => {
    return this.http.post<IResponse<IResponseLogin>>(`${this.url}login`, params);
  };
}
