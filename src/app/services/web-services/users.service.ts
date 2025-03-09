import { IResponse, IResponseLogin } from "@interfaces/services.interface";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Injectable, inject } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class UsersService {
  private http = inject(HttpClient);

  private readonly url = `${environment.apiUrl}users/`;

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
    });
  }

  public createUser = (params: { email: string; password: string }) => {
    return this.http.post<IResponse<string>>(`${this.url}createUser`, params, {
      headers: this.getHeaders(),
    });
  };
}
